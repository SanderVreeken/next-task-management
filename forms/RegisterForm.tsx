import { useRouter } from 'next/router'
import { useState } from 'react'

import { createUser } from '../graphql/fetchers/users'
import { CREATE_USER_QUERY } from '../graphql/queries/users'

import { RegisterInputs } from '../constants/inputs'

import Button from '../components/Button'
import { useStateValue } from '../components/StateProvider'
import styles from '../styles/RegisterForm.module.css'

export default function RegisterForm() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        password: undefined  
    })
    const [, dispatch] = useStateValue()

    const registerUser = async (event) => {
        event.preventDefault()
        try {
            const data = await createUser(CREATE_USER_QUERY, { email: user.email, firstName: user['first-name'], lastName: user['last-name'], password: user.password })
            dispatch({
                type: 'UPDATE_USER',
                item: data.createUser._id
            })
            localStorage.setItem('AUTHORIZATION_TOKEN', data.createUser.token)
            router.push('/app/onboard')
        } catch(error) {
            console.log(error)
        }
    }

    const updateState = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    return (
        <form className={styles.registerForm}>
            {RegisterInputs.map(input => (
                <input name={input.name} onChange={(event) => updateState(input.name, event.target.value)} placeholder={input.placeholder} type={input.type} />
            ))}
            <Button backgroundColor='#0d6efd' color='white' onClick={async (event) => registerUser(event)} padding='0.6rem 1rem'>
                <h3>Register</h3>
            </Button>
        </form>
    )
}