import Avatar from './Avatar'
import styles from '../styles/NameTag.module.css'
import UserT from '../types/User'

type Props = { 
    user: UserT
}

export default function NameTag({ user }: Props) {
    return (
        <div className={styles.nameTag}>
            <Avatar type='small' user={user} />
            <h5>{`${user.firstName} ${user.lastName}`}</h5>
        </div>
    )
}