import moment from 'moment'
import useSWR from 'swr'
import { useState } from 'react'

import { createTask, taskFetcher, updateTask } from '../graphql/fetchers/tasks'
import { CREATE_TASK_QUERY, READ_TASK_QUERY, UPDATE_TASK_QUERY } from '../graphql/queries/tasks'

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
    const [{ task: stateTask, team, user }, dispatch] = useStateValue()

    // Fetch of the already existing task the user selected.
    const { data: fetchedTask, mutate } = useSWR(stateTask ? [READ_TASK_QUERY, stateTask] : null, taskFetcher)

    // Function that is used to check the value state on null, which then will be rendered as empty string.
    const checkForNull = value => value === null ? '' : value

    const determineOnClick = (event, index) => {
        event.preventDefault()
        switch(index) {
            case 0:
                saveTask()
                break
            case 1:
                dispatch({
                    type: 'UPDATE_COVER',
                    item: false
                })
                break   
        }
    }

    // Function that fires the GraphQL query to save the task in the database.
    const saveTask = async () => {
        try {
            stateTask ? (
                await updateTask(UPDATE_TASK_QUERY, { id: stateTask, assignedTo: fetchedTask.readTask.assignedTo.map(user => user._id), attachments: fetchedTask.readTask.attachments, createdAt: fetchedTask.readTask.createdAt, createdBy: fetchedTask.readTask.createdBy._id, description: fetchedTask.readTask.description, dueDate: fetchedTask.readTask.dueDate, flagged: fetchedTask.readTask.flagged, list: fetchedTask.readTask.list, tags: fetchedTask.readTask.tags.map(tag => tag._id), team: fetchedTask.readTask.team, title: fetchedTask.readTask.title })
            ) : (
                // console.log({ assignedTo: newTask.assignedTo.map(user => user._id), description: newTask.description, dueDate: newTask.dueDate, list: newTask.list.order, tags: newTask.tags.map(tag => tag._id), team, title: newTask.title, user })
                await createTask(CREATE_TASK_QUERY, { assignedTo: newTask.assignedTo.map(user => user._id), description: newTask.description, dueDate: newTask.dueDate, list: newTask.list.order, tags: newTask.tags.map(tag => tag._id), team, title: newTask.title, user })
            )
            dispatch({
                type: 'UPDATE_COVER',
                item: false
            })
        } catch(error) {
            console.log(error.response.errors)
        }
    }

    // Function that handles the updates of the keys of the already existing product. 
    const updateKeys = async (key, value) => {
        switch(key) {
            case 'list':
                await mutate(fetchedTask => ({...fetchedTask, readTask: {...fetchedTask.readTask, [key]: value.order}}), false) 
                break
            default:
                await mutate(fetchedTask => ({...fetchedTask, readTask: {...fetchedTask.readTask, [key]: value}}), false)
        }
    }

    // Functions that is used to update the state of the task.
    const updateState = (key, value) => {
        // console.log(key, value, fetchedTask)
        stateTask ? (
            updateKeys(key, value)
        ) : (
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
                    <input onChange={(event) => updateState('title', event.target.value)} placeholder='Enter title' role='title' value={stateTask ? fetchedTask.readTask.title : newTask.title} />
                    <label>Due date</label>
                    <input onChange={(event) => updateState('dueDate', new Date(event.target.value).valueOf())} placeholder='dd-mm-yyyy' type='date' value={stateTask ? moment(fetchedTask.readTask.dueDate).format('yyyy-MM-DD') : moment(newTask.dueDate).format('yyyy-MM-DD')} />
                    <label>Description</label>
                    <textarea onChange={(event) => updateState('description', event.target.value)} value={stateTask ? checkForNull(fetchedTask.readTask.description) : newTask.description}></textarea>
                    <label>Assigned to</label>
                    <Selector current={stateTask ? fetchedTask.readTask.assignedTo : newTask.assignedTo} onSelect={(option) => {
                        const assignedTo = stateTask ? [...fetchedTask.readTask.assignedTo, option] : [...newTask.assignedTo, option] 
                        updateState('assignedTo', assignedTo)
                    }} options={users} optionType='user' />
                    <label>List</label>
                    <Dropdown onSelect={(list) => updateState('list', list)} options={lists} optionType='list' type='regular' value={stateTask ? lists[fetchedTask.readTask.list - 1] : newTask.list} />
                    <label>Tags</label>
                    <Selector current={stateTask ? fetchedTask.readTask.tags : newTask.tags} onSelect={(option) => {
                        const tags = stateTask ? [...fetchedTask.readTask.tags, option] : [...newTask.tags, option]
                        updateState('tags', tags)
                    }} options={tags} optionType='tag' />
                    <span role='buttons'>
                        {TaskFormButtons.map((button, index) => (
                            <Button backgroundColor={button.backgroundColor} borderColor={button.borderColor} color={button.color} key={index} onClick={(event) => determineOnClick(event, index)}>
                                <h4>{button.title}</h4>
                            </Button>
                        ))}
                    </span> 
                </>
            )} 
        </form>
    )
}