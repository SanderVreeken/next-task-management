import { useState } from 'react'

import { createTask } from '../graphql/fetchers/tasks'
import { CREATE_TASK_QUERY } from '../graphql/queries/tasks'

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
    const [task, setTask] = useState({
        assignedTo: [],
        description: '',
        dueDate: undefined,
        list: undefined,
        tags: [],
        title: ''
    })
    const [{ team, user }] = useStateValue()

    const saveTask = async event => {
        event.preventDefault()

        try {
            await createTask(CREATE_TASK_QUERY, { assignedTo: task.assignedTo.map(user => user._id), description: task.description, dueDate: task.dueDate, list: task.list.order, tags: task.tags.map(tag => tag._id), team, title: task.title, user })
        } catch(error) {
            console.log(error.response.errors)
        }
    }

    const updateTask = (key, value) => {
        setTask({
            ...task,
            [key]: value
        })
    }

    return (
        <form className={styles.taskForm}>
            <input onChange={(event) => updateTask('title', event.target.value)} placeholder='Enter title' role='title' />
            <label>Due date</label>
            <input onChange={(event) => updateTask('dueDate', new Date(event.target.value).valueOf())} placeholder='dd-mm-yyyy' type='date' />
            <label>Description</label>
            <textarea onChange={(event) => updateTask('description', event.target.value)}></textarea>
            <label>Assigned to</label>
            <Selector onSelect={(option) => {
                const assignedTo = [...task.assignedTo, option]
                updateTask('assignedTo', assignedTo)
            }} options={users} optionType='user' />
            <label>List</label>
            <Dropdown onSelect={(list) => updateTask('list', list)} options={lists} optionType='list' type='regular' value={task.list} />
            <label>Tags</label>
            <Selector onSelect={(option) => {
                const tags = [...task.tags, option]
                updateTask('tags', tags)
            }} options={tags} optionType='tag' />
            <span role='buttons'>
            {TaskFormButtons.map((button, index) => (
                <Button backgroundColor={button.backgroundColor} borderColor={button.borderColor} color={button.color} key={index} onClick={(event => saveTask(event))}>
                    <h4>{button.title}</h4>
                </Button>
            ))}
            </span>  
        </form>
    )
}