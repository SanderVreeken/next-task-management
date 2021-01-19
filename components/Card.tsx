import { AiFillFlag, AiOutlineClockCircle, AiOutlinePaperClip } from 'react-icons/ai'

import Line from './Line'
import Tag from './Tag'
import styles from '../styles/Card.module.css'
import Avatar from './Avatar'

const tags = ['Meacanas Lacus', 'Viverra Diam']
// TODO: Replace users with data form a database instead.
import Users from '../mockdata/users'

export default function Card() {
    return (
        <div className={styles.card}>
            <section role='top'>
                <h4>Mobile Wireframes</h4>
                <span role='tags'>
                    {tags.map(tag => <Tag title={tag} />)}
                </span>
            </section>
            <Line />
            <section role='bottom'>
                <span role='meta'>
                    <span>
                        <AiOutlinePaperClip />
                        <h4>3</h4>
                    </span>
                    <span>
                        <AiFillFlag />
                    </span>
                    <span>
                        <AiOutlineClockCircle />
                        <h4>Apr 12</h4>
                    </span>
                </span>
                <span role='avatars'>
                    <Avatar type='small' user={Users[0]}/>
                </span>
            </section>
        </div>
    )
}