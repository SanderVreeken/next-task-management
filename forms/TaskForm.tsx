import { useState } from 'react'

import ListT from '../types/List'
import UserT from '../types/User'
import { TaskFormButtons } from '../constants/buttons'

import Button from '../components/Button'
import Dropdown from '../components/Dropdown'
import Selector from '../components/Selector'
import styles from '../styles/TaskForm.module.css'

type Props = {
    lists: ListT[]
    users: UserT[]
}

export default function TaskForm({ lists, users }: Props) {
    const [list, setList] = useState(null)

    return (
        <form className={styles.taskForm}>
            <input placeholder='Enter title' role='title'></input>
            <label>Due date</label>
            <input placeholder='dd-mm-yyyy' type='date'></input>
            <label>Description</label>
            <textarea></textarea>
            <label>Assigned to</label>
            <Selector users={users} />
            <label>List</label>
            <Dropdown onSelect={(list) => setList(list)} options={lists} optionType='list' type='regular' value={list} />
            <label>Tags</label>
            <Selector users={users} />
            <span role='buttons'>
            {TaskFormButtons.map(button => (
                <Button backgroundColor={button.backgroundColor} borderColor={button.borderColor} color={button.color}>
                    <h4>{button.title}</h4>
                </Button>
            ))}
            </span>  
        </form>
    )
}