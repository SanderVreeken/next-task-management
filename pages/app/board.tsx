import jwtDecode from 'jwt-decode'
import Head from 'next/head'
import useSWR from 'swr'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AiOutlinePlus } from 'react-icons/ai'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { listsFetcher } from '../../graphql/fetchers/lists'
import { tagsFetcher } from '../../graphql/fetchers/tags'
import { tasksFetcher } from '../../graphql/fetchers/tasks'
import { teamFetcher } from '../../graphql/fetchers/teams'
import { usersFetcher } from '../../graphql/fetchers/users'
import { READ_LISTS_QUERY } from '../../graphql/queries/lists'
import { READ_TAGS_QUERY } from '../../graphql/queries/tags'
import { READ_TEAM_QUERY } from '../../graphql/queries/teams'
import { READ_TASKS_QUERY } from '../../graphql/queries/tasks'
import { READ_USERS_QUERY } from '../../graphql/queries/users'

import { HeaderButtons } from '../../constants/buttons'
import { groupObject, sortData } from '../../utils/helpers'

import Anchor from '../../components/Anchor'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Cover from '../../components/Cover'
import Header from '../../components/Header'
import List from '../../components/List'
import NavBar from '../../components/NavBar'
import Tag from '../../components/Tag'
import TaskForm from '../../forms/TaskForm'
import { useStateValue } from '../../components/StateProvider'
import styles from '../../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  const [{ cover, team }, dispatch] = useStateValue()

  const { data: lists } = useSWR([READ_LISTS_QUERY, team], listsFetcher)
  const { data: tags } = useSWR([READ_TAGS_QUERY, team], tagsFetcher)
  const { data: teamData } = useSWR([READ_TEAM_QUERY, team], teamFetcher)
  const { data: tasks } = useSWR([READ_TASKS_QUERY, team], tasksFetcher, { refreshInterval: 1000 })
  const { data: users } = useSWR([READ_USERS_QUERY, team], usersFetcher) 
  
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
        }
    } else {
        router.push('/login')
    }
  }, [])

  return (
    <div className={styles.home}>
      <Head>
        <title>Task Management | Board</title>
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
      <Header backgroundColor='#f8f8f8' borderColor='#e6ecf0' justifyContent='space-between'>
        <>
          <section role='left'>
            {teamData && (
              <span>
                <h4 role='title'>{teamData.readTeam.title}</h4>
                <Tag title={teamData.readTeam.subtitle} />
              </span>
            )}
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
        {lists && (
          <>
            <DndProvider backend={HTML5Backend}>
              <div role='board'>
                  {tasks && sortData(lists.readLists, 'order').map(list => (
                      <List key={list._id} list={list.order} tasks={groupObject(tasks.readTasks, 'list')[list.order]} title={list.title} />
                  ))}
              </div>
            </DndProvider>
          </>
        )}
        {cover && (
          <Cover>
            {(lists && tags && users) && <TaskForm lists={sortData(lists.readLists, 'order')} tags={tags.readTags} users={users.readUsers} />}
          </Cover>
        )}
      </main>
    </div>
  )
}
