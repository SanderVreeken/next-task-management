import moment from 'moment'
import { AiFillFlag, AiOutlineClockCircle, AiOutlineFlag, AiOutlinePaperClip } from 'react-icons/ai'

import UserT from '../types/User'

import Line from './Line'
import Tag from './Tag'
import styles from '../styles/Card.module.css'
import Avatar from './Avatar'

type Props = {
    attachments?: number
    assignedTo: UserT[]
    description?: string
    dueDate: number
    flagged: boolean
    tags: string[]
    title: string
}

export default function Card({ assignedTo, attachments, description, dueDate, flagged, tags, title }: Props) {
    return (
        <div className={styles.card}>
            <section role='top'>
                <h4>{title}</h4>
                {description && <p role='description'>{description}</p>}
                <span role='tags' style={{
                    marginTop: !description && '1rem'
                }}>
                    {/* TODO: Set the id of the tag to the corresponding id from the database rather than the index. */}
                    {tags.map((tag, index) => <Tag key={index} title={tag} />)}
                </span>
            </section>
            <Line />
            <section role='bottom'>
                <span role='meta'>
                    <span>
                        <AiOutlinePaperClip />
                        {attachments && <h5>{attachments}</h5>}
                    </span>
                    <span>
                        {flagged ? <AiFillFlag /> : <AiOutlineFlag />}
                    </span>
                    <span>
                        <AiOutlineClockCircle />
                        <h5>{moment(dueDate).format('MMM DD')}</h5>
                    </span>
                </span>
                <span role='avatars'>
                    {assignedTo.slice(0, 2).map(user => (
                        <Avatar key={user._id} type='small' user={user} />
                    ))}
                    {assignedTo.length > 2 && (
                        <div role='avatar-surplus' style={{
                            fontSize: '10px'
                        }}>
                            <p>+{assignedTo.length - 2}</p>
                        </div>
                    )}
                </span>
            </section>
        </div>
    )
}