import SearchBar from '../components/SearchBar'
import styles from '../styles/NavBar.module.css'

export default function NavBar() {
    return (
        <div className={styles.navBar}>
            <SearchBar />
        </div>
    )
}