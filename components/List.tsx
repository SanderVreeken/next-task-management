import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai'
import { useDrop } from 'react-dnd'

import { updateTask } from '../graphql/fetchers/tasks'
import { UPDATE_TASK_QUERY } from '../graphql/queries/tasks'

import TaskT from '../types/Task'
import ItemTypes from '../constants/ItemTypes'

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
                await updateTask(UPDATE_TASK_QUERY, { id: item.id, list: list })
            } catch(error) {
                console.log(error.response.errors[0].message)
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
                    <Card assignedTo={task.assignedTo} attachments={task.attachments} description={task.description} dueDate={task.dueDate} flagged={task.flagged} id={task._id} key={task._id} tags={task.tags} title={task.title} />
                ))}
            </section>
        </div>
    )
}