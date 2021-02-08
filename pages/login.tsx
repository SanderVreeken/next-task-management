import Admin from '../constants/admin'

import LoginForm from '../forms/LoginForm'
import styles from '../styles/Login.module.css'

export default function Login() {
    return (
        <div className={styles.login}>
            {Admin.icon}
            <h1>{`Login into ${Admin.name}`}</h1>
            <LoginForm />
        </div>
    )
}