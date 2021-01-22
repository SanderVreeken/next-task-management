import useSWR from 'swr'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { listsFetcher } from '../graphql/fetchers/lists'
import { tasksFetcher } from '../graphql/fetchers/tasks'
import { READ_LISTS_QUERY } from '../graphql/queries/lists'
import { READ_TASKS_QUERY } from '../graphql/queries/tasks'

import { groupObject, sortData } from '../utils/helpers'

import List from '../components/List'
import { useStateValue } from '../components/StateProvider'
import styles from '../styles/Board.module.css'

export default function Board() {
    const [{ team }] = useStateValue()

    const { data: lists } = useSWR([READ_LISTS_QUERY, team], listsFetcher)
    const { data: tasks } = useSWR([READ_TASKS_QUERY, team], tasksFetcher, { refreshInterval: 1000 })

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.board}>
                {(lists && tasks) && sortData(lists.readLists, 'order').map(list => (
                    <List key={list._id} list={list.order} tasks={groupObject(tasks.readTasks, 'list')[list.order]} title={list.title} />
                ))}
            </div>
        </DndProvider>
    )
}