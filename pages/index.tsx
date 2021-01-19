import Head from 'next/head'
import { AiOutlinePlus } from 'react-icons/ai'

import { HeaderButtons } from '../constants/buttons'
// TODO: Replace users with data form a database instead.
import Users from '../mockdata/users'

import Avatar from '../components/Avatar'
import Board from '../components/Board'
import Button from '../components/Button'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>Task Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header backgroundColor='#0d6efd' justifyContent='center'>
        <span>
          {HeaderButtons.map(button => (
            <Button backgroundColor='transparent' color='white'>
              <>
                {button.icon}
                <h4>{button.title}</h4>
              </>
            </Button>
          ))}
        </span>
      </Header>
      <Header backgroundColor='#f8f8f8' borderColor='#e6ecf0' justifyContent='space-between'>
        <>
          <section role='left'>
            <h4>Product Design Team</h4>
          </section>
          <section role='right'>
            <span>
              <Avatar type='medium' user={Users[0]} />
            </span>
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
