import { AiOutlineSearch } from 'react-icons/ai'
import styles from '../styles/SearchBar.module.css'

export default function SearchBar() {
    return (
        <div className={styles.searchBar}>
            <AiOutlineSearch />
            <input placeholder='Search Items'></input>
        </div>
    )
}