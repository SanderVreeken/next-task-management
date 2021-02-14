import { ApolloServer, gql } from 'apollo-server-micro'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/mongodb'

type Props = {
    team: string
}

const typeDefs = gql`
    type Query {
        readLogs(team: String!): [Log]!
    }
    type Log {
        _id: ID
        action: String
        date: Float
        item: Task
        team: String
        type: String
        user: User
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
        _id: ID!
        createdAt: Float
        email: String
        firstName: String!
        lastName: String!
        team: String
    }
`

const resolvers = {
    Query: {
        async readLogs(_: any, { team }: Props) {
            const { db } = await connectToDatabase()

            const logs = await db.collection('logs').find({ team: team }).toArray()

            return logs.map(async log => {
                log.item = await db.collection('tasks').findOne({ _id: ObjectID(log.item) })
                log.item.assignedTo = await Promise.all(log.item.assignedTo.map(async user => {
                    return await db.collection('users').findOne({ _id: ObjectID(user) })
                }))

                log.item.createdBy = await db.collection('users').findOne({ _id: ObjectID(log.item.createdBy) })
                log.item.tags = await Promise.all(log.item.tags.map(async tag => {
                    return await db.collection('tags').findOne({ _id: tag })
                }))
                log.user = await db.collection('users').findOne({ _id: ObjectID(log.user) })

                return log
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
export default apolloServer.createHandler({ path: '/api/logs' })