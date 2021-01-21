import { ApolloServer, gql } from 'apollo-server-micro'

import { connectToDatabase } from '../../utils/mongodb'

type Props = {
    team: string
}

const typeDefs = gql`
    type Query {
        readLists(team: String!): [List]!
    }
    type List {
        _id: ID
        order: Int
        team: String
        title: String
    }
`

const resolvers = {
    Query: {
        async readLists(_: any, { team }: Props) {
            const { db } = await connectToDatabase()

            const lists = await db.collection('lists').find({ team: team }).toArray()
            return lists
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
export default apolloServer.createHandler({ path: '/api/lists' })