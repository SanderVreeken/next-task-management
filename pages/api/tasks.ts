import { ApolloServer, gql } from 'apollo-server-micro'

import { connectToDatabase } from '../../utils/mongodb'

type Props = {
    id: string,
    list: number,
    team: string
}

const typeDefs = gql`
    type Mutation {
        updateTask(id: String!, list: Int!): [Task]!
    }
    type Query {
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
        tags: [String]
        team: String
        title: String
        flagged: Boolean
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
        async updateTask(parent: any, { id, list }: Props) {
            const { db } = await connectToDatabase()
            
            try { 
                const task = await db.collection('tasks').findOne({ _id: id })
                task.list = list

                await db.collection('tasks').updateOne({ _id: id }, { $set: task })

                task.createdBy = await db.collection('users').findOne({ _id: task.createdBy })
                task.assignedTo = await Promise.all(task.assignedTo.map(async user => {
                    return await db.collection('users').findOne({ _id: user })
                }))
                
                return task
            } catch(error) {
                throw new Error(error)
            }
        }
    },
    Query: {
        async readTasks(_: any, { team }: Props) {
            const { db } = await connectToDatabase()

            const tasks = await db.collection('tasks').find({ team: team }).toArray()

            return tasks.map(async task => {
                task.createdBy = await db.collection('users').findOne({ _id: task.createdBy })
                task.assignedTo = await Promise.all(task.assignedTo.map(async user => {
                    return await db.collection('users').findOne({ _id: user })
                }))
                return task
            })
        }
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