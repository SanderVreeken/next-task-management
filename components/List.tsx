import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai'
import { useDrop } from 'react-dnd'

import { updateTask } from '../graphql/fetchers/tasks'
import { UPDATE_TASK_QUERY } from '../graphql/queries/tasks'

import TaskT from '../types/Task'
import ItemTypes from '../constants/itemTypes'

import Button from './Button'
import Card from './Card'
import Header from './Header'
import styles from '../styles/List.module.css'

type Props = {
    list: number
    tasks?: TaskT[]
    title: string
}

export default function List({ list, tasks, title }) {
    const [{ isOver, item }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: async () => {
            try {
                await updateTask(UPDATE_TASK_QUERY, { id: item.task.id, assignedTo: item.task.assignedTo.map(user => user._id), attachments: item.task.attachments, createdAt: item.task.createdAt, createdBy: item.task.createdBy._id, description: item.task.description, dueDate: item.task.dueDate, flagged: item.task.flagged, list: list, tags: item.task.tags.map(tag => tag._id), team: item.task.team, title: item.task.title })
            } catch(error) {
                console.log(error)
            }
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            item: monitor.getItem()
        }),
    })

    return (
        <div className={styles.list} ref={drop} style={{
            backgroundColor: isOver && 'yellow'
        }}>
            <Header backgroundColor='transparent' justifyContent='space-between' padding='0'>
                <>
                    <span>
                        <h4>{title}</h4>
                    </span>
                    <span role='buttons'>
                        <Button backgroundColor='#e6ecf0'>
                            <AiOutlinePlus />
                        </Button>
                        <Button backgroundColor='#e6ecf0'>
                            <AiOutlineEllipsis />
                        </Button>
                    </span>
                </>
            </Header>
            <section role='body'>
                {tasks && tasks.map((task: TaskT) => (
                    <Card assignedTo={task.assignedTo} attachments={task.attachments} createdAt={task.createdAt} createdBy={task.createdBy} description={task.description} dueDate={task.dueDate} flagged={task.flagged} list={task.list} id={task._id} key={task._id} tags={task.tags} team={task.team} title={task.title} />
                ))}
            </section>
        </div>
    )
}