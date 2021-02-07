import Admin from '../constants/admin'

import RegisterForm from '../forms/RegisterForm'
import styles from '../styles/Register.module.css'

export default function Register() {
    return (
        <div className={styles.register}>
            {Admin.icon}
            <h1>{`Try ${Admin.name} for free`}</h1>
            <RegisterForm />
        </div>
    )
}