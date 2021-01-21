import { ApolloServer, gql } from 'apollo-server-micro'

import { connectToDatabase } from '../../utils/mongodb'

type Props = {
    team: string
}

const typeDefs = gql`
    type Query {
        readUsers(team: String!): [User]!
    }
    type User {
        _id: ID
        firstName: String
        lastName: String
        team: String
    }
`

const resolvers = {
    Query: {
        async readUsers(_: any, { team }: Props) {
            const { db } = await connectToDatabase()

            const users = await db.collection('users').find({ team: team }).toArray()
            return users
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
export default apolloServer.createHandler({ path: '/api/users' })