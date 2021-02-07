import Head from 'next/head'
import useSWR from 'swr'
import { AiOutlinePlus } from 'react-icons/ai'

import { logsFetcher } from '../../graphql/fetchers/logs'
import { usersFetcher } from '../../graphql/fetchers/users'
import { READ_LOGS_QUERY } from '../../graphql/queries/logs'
import { READ_USERS_QUERY } from '../../graphql/queries/users'

import { HeaderButtons } from '../../constants/buttons'

import Anchor from '../../components/Anchor'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Header from '../../components/Header'
import Tag from '../../components/Tag'
import { useStateValue } from '../../components/StateProvider'
import styles from '../../styles/Feed.module.css'
import Log from '../../components/Log'

export default function Feed() {
    const [{ team }] = useStateValue()

    const { data: logs } = useSWR([READ_LOGS_QUERY, team], logsFetcher)

    return (
        <div className={styles.feed}>
            <Head>
                <title>Task Management | Feed</title>
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
                <Header backgroundColor='transparent' justifyContent='space-between'>
                    <h1>Sander</h1>
                </Header>
                <div>
                    <div>
                        <h1>Left</h1>
                    </div>
                    <div>
                        <h4>Recent Activity</h4>
                        {logs && (
                            <span>
                                {logs.readLogs.map(log => (
                                    <Log action={log.action} date={log.date} title={log.item.title} user={log.user} />
                                ))}
                            </span>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}