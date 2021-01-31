import moment from 'moment'
import useSWR from 'swr'
import { useState } from 'react'

import { createTask, taskFetcher } from '../graphql/fetchers/tasks'
import { CREATE_TASK_QUERY, READ_TASK_QUERY } from '../graphql/queries/tasks'

import ListT from '../types/List'
import TagT from '../types/Tag'
import UserT from '../types/User'
import { TaskFormButtons } from '../constants/buttons'

import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import Selector from '../components/Selector'
import { useStateValue } from '../components/StateProvider'
import styles from '../styles/TaskForm.module.css'

type Props = {
    lists: ListT[]
    tags: TagT[]
    users: UserT[]
}

export default function TaskForm({ lists, tags, users }: Props) {
    // State that is used to store the values the user enters within the form.
    const [newTask, setNewTask] = useState({
        assignedTo: [],
        description: '',
        dueDate: undefined,
        list: undefined,
        tags: [],
        title: ''
    })
    const [{ task: stateTask, team, user }] = useStateValue()

    // Fetch of the already existing task the user selected.
    const { data: fetchedTask, mutate } = useSWR(stateTask ? [READ_TASK_QUERY, stateTask] : null, taskFetcher)

    // Function that is used to check the value state on null, which then will be rendered as empty string.
    const checkForNull = value => value === null ? '' : value

    // Function that fires the GraphQL query to save the task in the database.
    const saveTask = async event => {
        event.preventDefault()

        try {
            await createTask(CREATE_TASK_QUERY, { assignedTo: newTask.assignedTo.map(user => user._id), description: newTask.description, dueDate: newTask.dueDate, list: newTask.list.order, tags: newTask.tags.map(tag => tag._id), team, title: newTask.title, user })
        } catch(error) {
            console.log(error.response.errors)
        }
    }

    const testFunction = async () => {
        // fetchedTask.readTask.title = 'Sander'
        // console.log(await mutate(fetchedTask))
        // console.log(fetchedTask)

        // fetchedTask.readTask.title = 'Sander'
        console.log(await mutate(fetchedTask => ({...fetchedTask, readTask: {...fetchedTask.readTask, title: 'Sander'}}), false))
    }

    // Functions that is used to update the state of the task.
    const updateTask = (key, value) => {
        taskFetcher ? testFunction() : (
            setNewTask({
                ...newTask,
                [key]: value
            })
        )
    }

    return (
        <form className={styles.taskForm}>
            {(stateTask && !fetchedTask) ? (
                <h5>Loading ...</h5>
            ) : (
                <>
                    <input onChange={(event) => updateTask('title', event.target.value)} placeholder='Enter title' role='title' value={stateTask ? fetchedTask.readTask.title : newTask.title} />
                    <label>Due date</label>
                    <input onChange={(event) => updateTask('dueDate', new Date(event.target.value).valueOf())} placeholder='dd-mm-yyyy' type='date' value={stateTask ? moment(fetchedTask.readTask.dueDate).format('yyyy-MM-DD') : newTask.dueDate} />
                    <label>Description</label>
                    <textarea onChange={(event) => updateTask('description', event.target.value)} value={stateTask ? checkForNull(fetchedTask.readTask.description) : newTask.description}></textarea>
                    <label>Assigned to</label>
                    <Selector current={stateTask ? fetchedTask.readTask.assignedTo : newTask.assignedTo} onSelect={(option) => {
                        const assignedTo = [...newTask.assignedTo, option]
                        updateTask('assignedTo', assignedTo)
                    }} options={users} optionType='user' />
                    <label>List</label>
                    <Dropdown onSelect={(list) => updateTask('list', list)} options={lists} optionType='list' type='regular' value={stateTask ? lists[fetchedTask.readTask.list - 1] : newTask.list} />
                    <label>Tags</label>
                    <Selector current={stateTask ? fetchedTask.readTask.tags : newTask.tags} onSelect={(option) => {
                        const tags = [...newTask.tags, option]
                        updateTask('tags', tags)
                    }} options={tags} optionType='tag' />
                    <span role='buttons'>
                        {TaskFormButtons.map((button, index) => (
                            <Button backgroundColor={button.backgroundColor} borderColor={button.borderColor} color={button.color} key={index} onClick={(event => saveTask(event))}>
                                <h4>{button.title}</h4>
                            </Button>
                        ))}
                    </span> 
                </>
            )} 
        </form>
    )
}