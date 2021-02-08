import { useRouter } from 'next/router'
import { useState } from 'react'

import { validateUser } from '../graphql/fetchers/users'
import { VALIDATE_USER_QUERY } from '../graphql/queries/users'

import { LoginInputs } from '../constants/inputs'

import Button from '../components/Button'
import styles from '../styles/LoginForm.module.css'

export default function LoginForm() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: undefined,
        password: undefined  
    })

    const updateState = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    const loginUser = async event => {
        event.preventDefault()
        try {
            const data = await validateUser(VALIDATE_USER_QUERY, user.email, user.password)
            localStorage.setItem('AUTHORIZATION_TOKEN', data.validateUser.token) 
            router.push('/app/board')
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <form className={styles.loginForm}>
            {LoginInputs.map(input => (
                <input name={input.name} onChange={(event) => updateState(input.name, event.target.value)} placeholder={input.placeholder} type={input.type} />
            ))}
            <Button backgroundColor='#0d6efd' color='white' onClick={event => loginUser(event)} padding='0.6rem 1rem'>
                <h3>Login</h3>
            </Button>
        </form>
    )
}