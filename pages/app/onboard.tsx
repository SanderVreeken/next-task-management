import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { createTeam } from '../../graphql/fetchers/teams'
import { updateUser } from '../../graphql/fetchers/users'
import { CREATE_TEAM_QUERY } from '../../graphql/queries/teams'
import { UPDATE_USER_QUERY } from '../../graphql/queries/users'

import Admin from '../../constants/admin'

import Button from '../../components/Button'
import { useStateValue } from '../../components/StateProvider'
import styles from '../../styles/Onboard.module.css'

export default function Onboard() {
    const router = useRouter()
    const [inputs, setInputs] = useState({
        existing: '',
        new: ''
    })
    const [user, setUser] = useState(null)
    const [, dispatch] = useStateValue()

    useEffect(() => {
        if (localStorage.getItem('AUTHORIZATION_TOKEN')) {
            const token: {
                _id: string,
                createdAt: number,
                email: string,
                exp: number,
                firstName: string,
                iat: number,
                lastName: string,
                team: string
            } = jwtDecode(localStorage.getItem('AUTHORIZATION_TOKEN'))
            if (token.exp * 1000 < new Date().valueOf()) {
                localStorage.removeItem('AUTHORIZATION_TOKEN')
                router.push('/login')
            } else {
                // console.log(token)
                setUser(token)
            }
        } else {
            router.push('/login')
        }
    }, [])

    const proceed = async () => {
        if (inputs.existing && !inputs.new) {
            const data = await updateUser(UPDATE_USER_QUERY, { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, team: inputs.existing })

            localStorage.setItem('AUTHORIZATION_TOKEN', data.updateUser.token) 
            router.push('/app/board')
        } else if (!inputs.existing && inputs.new) {  
            const teamData = await createTeam(CREATE_TEAM_QUERY, { title: inputs.new, user: user._id })
            const data = await updateUser(UPDATE_USER_QUERY, { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, team: teamData.createTeam._id })

            localStorage.setItem('AUTHORIZATION_TOKEN', data.updateUser.token) 
            router.push('/app/board')
        } else {
            console.log('We got an error!')
        }
    }

    const updateState = (key, value) => {
        setInputs({
            ...inputs,
            [key]: value
        })
    }

    return (
        user ? (
            <div className={styles.onboard}>
                <span>
                    {Admin.icon}
                    <h1>{`Hello, ${user.firstName}!`}</h1>
                    <div role='picker'>
                        <div>
                            <h4>Want to join an existing team?</h4>
                            <input onChange={(event) => updateState('existing', event.target.value)} placeholder='Enter group ID ...'></input>
                        </div>
                        <hr />
                        <div>
                            <h4>Or create your own team?</h4>
                            <input onChange={(event) => updateState('new', event.target.value)} placeholder='Enter new group title ...'></input>
                        </div>
                        <Button backgroundColor='#0d6efd' color='white' onClick={proceed} padding='0.6rem 1rem'>
                            <h3>Continue</h3>
                        </Button>
                    </div>
                </span>
            </div>
        ) : (
            <h3>User not logged in, you will be redirected.</h3>
        )
    )
}