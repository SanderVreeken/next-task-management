import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai'

import TaskT from '../types/Task'

import Button from './Button'
import Card from './Card'
import Header from './Header'
import styles from '../styles/List.module.css'

type Props = {
    tasks?: TaskT[]
    title: string
}

export default function List({ tasks, title }) {
    return (
        <div className={styles.list}>
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
                    <Card assignedTo={task.assignedTo} attachments={task.attachments} description={task.description} dueDate={task.dueDate} flagged={task.flagged} key={task._id} tags={task.tags} title={task.title} />
                ))}
            </section>
        </div>
    )
}