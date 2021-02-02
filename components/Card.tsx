import moment from 'moment'
import { AiFillFlag, AiOutlineClockCircle, AiOutlineFlag, AiOutlinePaperClip } from 'react-icons/ai'
import { useDrag } from 'react-dnd'

import TagT from '../types/Tag'
import UserT from '../types/User'
import ItemTypes from '../constants/itemTypes'

import Avatar from './Avatar'
import Line from './Line'
import Tag from './Tag'
import { useStateValue } from '../components/StateProvider'
import styles from '../styles/Card.module.css'

type Props = {
    attachments?: number
    assignedTo: UserT[]
    createdAt: number
    createdBy: UserT
    description?: string
    dueDate: number
    flagged: boolean
    list: number,
    id: string
    tags: TagT[]
    team: string
    title: string
}

export default function Card({ assignedTo, attachments, createdAt, createdBy, description, dueDate, flagged, list, id, tags, team, title }: Props) {
    const [{ isDragging }, drag] = useDrag({
        item: {
            task: {
                assignedTo,
                attachments,
                createdAt,
                createdBy,
                description,
                dueDate,
                flagged,
                id,
                list,
                tags,
                team,
                title
            },
            type: ItemTypes.CARD
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    const [, dispatch] = useStateValue()

    return (
        <div className={styles.card} onDoubleClick={() => {
            dispatch({
                type: 'UPDATE_COVER',
                item: true
            })
            dispatch({
                type: 'UPDATE_TASK',
                item: id
            })
        }} ref={drag} style={{
            opacity: isDragging ? 0.5 : 1
        }}>
            <section role='top'>
                <h4>{title}</h4>
                {description && <p role='description'>{description}</p>}
                <span role='tags' style={{
                    marginTop: !description && '1rem'
                }}>
                    {/* TODO: Set the id of the tag to the corresponding id from the database rather than the index. */}
                    {tags.map((tag, index) => <Tag key={index} title={tag.title} />)}
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
                    {assignedTo.slice(0, 1).map(user => (
                        <Avatar key={user._id} type='small' user={user} />
                    ))}
                    {assignedTo.length > 1 && (
                        <div role='avatar-surplus'>
                            <p style={{
                                fontSize: '10px'
                            }}>+{assignedTo.length - 1}</p>
                        </div>
                    )}
                </span>
            </section>
        </div>
    )
}