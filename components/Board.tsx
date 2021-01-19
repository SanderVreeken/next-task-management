import Lists from '../mockdata/lists'

import List from '../components/List'
import styles from '../styles/Board.module.css'

export default function Board() {
    return (
        <div className={styles.board}>
            <List title='To do' />
            <List title='In progess' />
            <List title='In review' />
            <List title='Done' />
        </div>
    )
}