import useSWR from 'swr'

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
    const { data: tasks } = useSWR([READ_TASKS_QUERY, team], tasksFetcher)

    return (
        <div className={styles.board}>
            {(lists && tasks) && sortData(lists.readLists, 'order').map(list => (
                <List key={list._id} tasks={groupObject(tasks.readTasks, 'list')[list.order]} title={list.title} />
            ))}
        </div>
    )
}