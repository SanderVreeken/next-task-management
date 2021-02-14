import jwtDecode from 'jwt-decode'
import Head from 'next/head'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { logsFetcher } from '../../graphql/fetchers/logs'
import { teamFetcher } from '../../graphql/fetchers/teams'
import { READ_LOGS_QUERY } from '../../graphql/queries/logs'
import { READ_TEAM_QUERY } from '../../graphql/queries/teams'

import { Settings } from '../../constants/settings'
import { HeaderButtons } from '../../constants/buttons'
import { sortData } from '../../utils/helpers'

import Anchor from '../../components/Anchor'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Log from '../../components/Log'
import Setting from '../../components/Setting'
import { useStateValue } from '../../components/StateProvider'
import styles from '../../styles/Settings.module.css'

export default function Feed() {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [{ team }, dispatch] = useStateValue()

    const { data: logs } = useSWR([READ_LOGS_QUERY, team], logsFetcher)
    const { data: teamData } = useSWR([READ_TEAM_QUERY, team], teamFetcher)

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
              dispatch({
                  type: 'UPDATE_TEAM',
                  item: token.team
              })
              dispatch({
                type: 'UPDATE_USER',
                item: token._id
              })
              setUser(token)
            }
        } else {
            router.push('/login')
        }
    }, [])


    return (
        <div className={styles.settings}>
            <Head>
                <title>Task Management | Settings</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header backgroundColor='#0d6efd' justifyContent='center'>
                <span>
                {HeaderButtons.map((button, index) => (
                    <Anchor href={button.href}>
                        <Button backgroundColor='transparent' color='white' key={index}>
                            <>
                            {button.icon}
                            <h3>{button.title}</h3>
                            </>
                        </Button>
                    </Anchor>
                ))}
                </span>
            </Header>
            <main>
                <div role='canvas'>
                    <Header backgroundColor='white' justifyContent='space-between'>
                        <>
                            {teamData && <span role='left'>
                                <h1>{teamData.readTeam.title}</h1>
                            </span>}
                            <span role='right'>
                                <Button backgroundColor='black' color='white' padding='0.6rem 0.8rem'>
                                    <h3>Invite member</h3>
                                </Button>
                            </span>
                        </>
                    </Header>
                    <div role='overview'>
                        <div role='settings'>
                            {Settings.map(setting => (
                                <Setting description={setting.description} requirements={setting.requirements} title={setting.title} user={user} value={setting.value} />
                            ))}
                        </div>
                        {logs && (
                            <div role='logs'>
                                {sortData(logs.readLogs, 'date').reverse().map(log => (
                                    <Log action={log.action} date={log.date} title={log.item.title} user={log.user} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}