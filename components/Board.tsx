import useSWR from 'swr'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { tasksFetcher } from '../graphql/fetchers/tasks'
import { READ_TASKS_QUERY } from '../graphql/queries/tasks'

import { groupObject, sortData } from '../utils/helpers'

import List from '../components/List'
import { useStateValue } from '../components/StateProvider'
import styles from '../styles/Board.module.css'

type Props = {
    lists: any
}

export default function Board({ lists }: Props) {
    const [{ team }] = useStateValue()

    const { data: tasks } = useSWR([READ_TASKS_QUERY, team], tasksFetcher, { refreshInterval: 1000 })

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.board}>
                {tasks && sortData(lists, 'order').map(list => (
                    <List key={list._id} list={list.order} tasks={groupObject(tasks.readTasks, 'list')[list.order]} title={list.title} />
                ))}
            </div>
        </DndProvider>
    )
}