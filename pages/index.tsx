import Head from 'next/head'
import useSWR from 'swr'
import { AiOutlinePlus } from 'react-icons/ai'

import { usersFetcher } from '../graphql/fetchers/users'
import { READ_USERS_QUERY } from '../graphql/queries/users'

import { HeaderButtons } from '../constants/buttons'

import Avatar from '../components/Avatar'
import Board from '../components/Board'
import Button from '../components/Button'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import { useStateValue } from '../components/StateProvider'
import styles from '../styles/Home.module.css'
import Tag from '../components/Tag'

export default function Home() {
  const [{ team }] = useStateValue()

  const { data: users } = useSWR([READ_USERS_QUERY, team], usersFetcher)
  
  return (
    <div className={styles.home}>
      <Head>
        <title>Task Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header backgroundColor='#0d6efd' justifyContent='center'>
        <span>
          {HeaderButtons.map((button, index) => (
            <Button backgroundColor='transparent' color='white' key={index}>
              <>
                {button.icon}
                <h3>{button.title}</h3>
              </>
            </Button>
          ))}
        </span>
      </Header>
      <Header backgroundColor='#f8f8f8' borderColor='#e6ecf0' justifyContent='space-between'>
        <>
          <section role='left'>
            <h4 role='title'>Product Design Team</h4>
            <Tag title='Sprint 8' />
          </section>
          <section role='right'>
            {users && <span role='avatars'>
              {users.readUsers.slice(0, 4).map(user => (
                <Avatar key={user._id} type='medium' user={user} />
              ))}
              {users.readUsers.length > 4 && (
                <div role='avatar-surplus' style={{
                  height: '36.5px',
                  width: '36.5px'
                }}>
                  <p style={{
                    fontSize: '13px'
                  }}>+{users.readUsers.length - 4}</p>
                </div>
              )}
            </span>}
            <Button backgroundColor='transparent'>
              <>
                <AiOutlinePlus />
                <h4>New Member</h4>
              </>
            </Button>
          </section>
        </>
      </Header>
      <main>
        <NavBar />
        <Board />
      </main>
    </div>
  )
}
