import { useState } from 'react'

import ListT from '../types/List'
import TagT from '../types/Tag'
import UserT from '../types/User'
import { TaskFormButtons } from '../constants/buttons'

import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import Selector from '../components/Selector'
import styles from '../styles/TaskForm.module.css'

type Props = {
    lists: ListT[]
    tags: TagT[]
    users: UserT[]
}

export default function TaskForm({ lists, tags, users }: Props) {
    const [task, setTask] = useState({})

    const updateTask = (key, value) => {
        setTask({
            ...task,
            [key]: value
        })
    }

    return (
        <form className={styles.taskForm}>
            <input onChange={(event) => updateTask('title', event.target.value)} placeholder='Enter title' role='title'></input>
            <label>Due date</label>
            <input onChange={(event) => updateTask('dueDate', new Date(event.target.value).valueOf())} placeholder='dd-mm-yyyy' type='date'></input>
            <label>Description</label>
            <textarea onChange={(event) => updateTask('description', event.target.value)}></textarea>
            <label>Assigned to</label>
            <Selector options={users} optionType='user' />
            <label>List</label>
            {/* <Dropdown onSelect={(list) => updateTask('list', list)} options={lists} optionType='list' type='regular' value={task.list} />
            <label>Tags</label> */}
            <Selector options={tags} optionType='tag' />
            <span role='buttons'>
            {TaskFormButtons.map(button => (
                <Button backgroundColor={button.backgroundColor} borderColor={button.borderColor} color={button.color} onClick={(event) => {
                    event.preventDefault()
                    console.log(task)
                }}>
                    <h4>{button.title}</h4>
                </Button>
            ))}
            </span>  
        </form>
    )
}