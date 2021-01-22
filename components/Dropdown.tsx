import SearchBar from './SearchBar'
import styles from '../styles/Dropdown.module.css'
import Avatar from './Avatar'

const user = {
    "_id": "f8427b0e-78d7-4d4d-819a-9dd0d2ae19f2",
    "firstName": "Edith",
    "lastName": "Anders",
    "team": "d86b76f5-b87e-4246-a9b0-cf5d2004e594"
}

export default function Dropdown() {
    return (
        <div className={styles.dropdown}>
            <SearchBar type='dropdown' />
            <section role='options'>
                <div role='option'>
                    <span role='user'>
                        <Avatar type='medium' user={user} />
                        <span role='titles'>
                            <h4>{`${user.firstName} ${user.lastName}`}</h4>
                            {/* <p>Revenue Manager</p> */}
                        </span>
                    </span>
                </div>
                <div role='option'>
                    <span role='user'>
                        <Avatar type='medium' user={user} />
                        <span role='titles'>
                            <h4>{`${user.firstName} ${user.lastName}`}</h4>
                            <p>Revenue Manager</p>
                        </span>
                    </span>
                </div>
            </section>
        </div>
    )
}