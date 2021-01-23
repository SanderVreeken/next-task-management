import { ApolloServer, gql } from 'apollo-server-micro'

import { connectToDatabase } from '../../utils/mongodb'

type Props = {
    team: string
}

const typeDefs = gql`
    type Query {
        readTags(team: String!): [Tag]!
    }
    type Tag {
        _id: ID
        team: String
        title: String
    }
`

const resolvers = {
    Query: {
        async readTags(_: any, { team }: Props) {
            const { db } = await connectToDatabase()

            const tags = await db.collection('tags').find({ team: team }).toArray()
            return tags
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
export default apolloServer.createHandler({ path: '/api/tags' })