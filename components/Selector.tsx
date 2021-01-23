import { useState } from 'react'

import UserT from '../types/User'

import Dropdown from './Dropdown'
import NameTag from './NameTag'
import styles from '../styles/Selector.module.css'

type Props = {
    users: UserT[]
}

export default function Selector({ users }: Props) {
    const [selected, setSelected] = useState([])

    return (
        <div className={styles.selector}>
            <div role='selected'>
                {selected && selected.map(user => (
                    <NameTag user={user} />
                ))}
            </div>
            <Dropdown onSelect={(user) => setSelected(selected => [...selected, user])} options={users} optionType='user' type='search' />
        </div>
    )
}