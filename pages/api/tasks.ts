import { ApolloServer, gql } from 'apollo-server-micro'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/mongodb'

type Props = {
    id: string
    assignedTo: string[]
    attachments?: number
    createdAt: number
    createdBy: string
    description: string
    dueDate: number
    editor: string
    flagged: boolean
    list: number
    tags: string[]
    team: string
    title: string
    user: string
}

const typeDefs = gql`
    type Mutation {
        createTask(assignedTo: [String], description: String, dueDate: Float!, list: Int!, tags: [String], team: String!, title: String!, user: String!): Task!
        updateTask(id: String!, assignedTo: [String], attachments: Int, createdAt: Float!, createdBy: String!, description: String, dueDate: Float!, editor: String!, flagged: Boolean!, list: Int!, tags: [String], team: String!, title: String!): Task!
    }
    type Query {
        readTask(id: String!): Task!
        readTasks(team: String!): [Task]!
    }
    type Task {
        _id: ID
        assignedTo: [User]
        attachments: Int
        createdAt: Float
        createdBy: User
        description: String
        dueDate: Float
        list: Int
        tags: [Tag]
        team: String
        title: String
        flagged: Boolean
    }
    type Tag {
        _id: ID
        team: String
        title: String
    }
    type User {
        _id: ID
        firstName: String
        lastName: String
        team: String
    }
`

const resolvers = {
    Mutation: {
        async createTask(_: any, { assignedTo, description, dueDate, list, tags, team, title, user }: Props) {
            const { db } = await connectToDatabase()
            
            try { 
                const task = {
                    assignedTo: assignedTo,
                    createdAt: new Date().valueOf(),
                    createdBy: user,
                    description: description,
                    dueDate: dueDate,
                    flagged: false,
                    list: list,
                    tags: tags,
                    team: team,
                    title: title,
                }

                await db.collection('tasks').insertOne(task)

                task.assignedTo = await Promise.all(task.assignedTo.map(async user => {
                    return await db.collection('users').findOne({ _id: ObjectID(user) })
                }))
                task.createdBy = await db.collection('users').findOne({ _id: task.createdBy })
                task.tags = await Promise.all(task.tags.map(async tag => {
                    return await db.collection('tags').findOne({ _id: tag })
                }))

                return task
            } catch(error) {
                throw new Error(error)
            }
        },
        async updateTask(_: any, { id, assignedTo, attachments, createdAt, createdBy, description, dueDate, editor, flagged, list, tags, team, title }: Props) {
            const { db } = await connectToDatabase()
            
            try { 
                const task = await db.collection('tasks').findOne({ _id: ObjectID(id) })
        
                task.assignedTo = assignedTo
                task.attachments = attachments
                task.createdAt = createdAt
                task.createdBy = createdBy
                task.description = description
                task.dueDate = dueDate
                task.flagged = flagged
                task.list = list
                task.tags = tags
                task.team = team
                task.title = title

                await db.collection('tasks').updateOne({ _id: ObjectID(id) }, { $set: task })

                const log = {
                    action: 'edited',
                    date: new Date().valueOf(),
                    item: id,
                    team: team,
                    type: 'task',
                    user: editor
                }

                await db.collection('logs').insertOne(log)

                task.assignedTo = await Promise.all(task.assignedTo.map(async user => {
                    return await db.collection('users').findOne({ _id: ObjectID(user) })
                }))
                task.createdBy = await db.collection('users').findOne({ _id: ObjectID(task.createdBy) })
                task.tags = await Promise.all(task.tags.map(async tag => {
                    return await db.collection('tags').findOne({ _id: tag })
                }))
                
                return task
            } catch(error) {
                throw new Error(error)
            }
        }
    },
    Query: {
        async readTask(_: any, { id }: Props) {
            const { db } = await connectToDatabase()

            const task = await db.collection('tasks').findOne({ _id: ObjectID(id) })
            
            task.assignedTo = await Promise.all(task.assignedTo.map(async user => {
                return await db.collection('users').findOne({ _id: ObjectID(user) })
            }))
            task.createdBy = await db.collection('users').findOne({ _id: ObjectID(task.createdBy) })
            task.tags = await Promise.all(task.tags.map(async tag => {
                return await db.collection('tags').findOne({ _id: tag })
            }))

            return task
        },
        async readTasks(_: any, { team }: Props) {
            const { db } = await connectToDatabase()

            const tasks = await db.collection('tasks').find({ team: team }).toArray()

            return tasks.map(async task => {
                task.assignedTo = await Promise.all(task.assignedTo.map(async user => {
                    return await db.collection('users').findOne({ _id: ObjectID(user) })
                }))
                task.createdBy = await db.collection('users').findOne({ _id: ObjectID(task.createdBy) })
                task.tags = await Promise.all(task.tags.map(async tag => {
                    return await db.collection('tags').findOne({ _id: tag })
                }))

                return task
            })
        },
    }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
    api: {
        bodyParser: false
    }
}

// Ensure to put a slash as the first character to prevent errors.
export default apolloServer.createHandler({ path: '/api/tasks' })