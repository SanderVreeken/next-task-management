import { AiOutlineSearch } from 'react-icons/ai'
import styles from '../styles/SearchBar.module.css'

type Props = {
    type: 'dropdown' | 'regular'
}

export default function SearchBar({ type }) {
    return (
        <div className={styles.searchBar} style={{
            borderRadius: type === 'dropdown' ? '5px 5px 0 0' : '5px'
        }}>
            <AiOutlineSearch />
            <input placeholder='Search Items'></input>
        </div>
    )
}