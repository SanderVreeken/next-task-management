import moment from 'moment'

import UserT from '../types/User'

import Avatar from '../components/Avatar'
import styles from '../styles/Log.module.css'

type Props = {
    action: 'created' | 'updated' | 'deleted' 
    date: number
    title: string
    user: UserT
}

export default function Log({ action, date, title, user }: Props) {
    return (
        <span className={styles.log}>
            <span>
                <Avatar type='medium' user={user} />
                <p role='text'>{`${user.firstName} ${action} ${title}`}</p>
            </span>
            <h5 role='date'>{moment(date).startOf('minutes').fromNow()}</h5>
        </span>
    )
}