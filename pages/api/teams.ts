import { ApolloServer, gql } from 'apollo-server-micro'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/mongodb'

type Props = {
    id: string
    title: string
    user: string
}

const typeDefs = gql`
    type Mutation {
        createTeam(title: String!, user: String!): Team!
    }
    type Query {
        readTeam(id: String!): Team!
    }
    type Team {
        _id: ID!
        admins: [String!]!
        createdAt: Float!
        createdBy: String!
        title: String!
        subtitle: String
    }
`

const resolvers = {
    Mutation: {
        async createTeam(_: any, { title, user }: Props) {
            const { db } = await connectToDatabase()

            try { 
                const team = {
                    admins: [user],
                    createdAt: new Date().valueOf(),
                    createdBy: user,
                    title: title
                }

                const data = await db.collection('teams').insertOne(team)

                await Promise.all(['To do', 'In progress', 'In review', 'Done'].map(async (title, index) => {
                    await db.collection('lists').insertOne({
                        order: index + 1,
                        team: `${data.ops[0]._id}`,
                        title
                    })
                }))

                return team
            } catch(error) {
                throw new Error(error)
            }
        }
    },
    Query: {
        async readTeam(_: any, { id }: Props) {
            const { db } = await connectToDatabase()

            const team = await db.collection('teams').findOne({ _id: ObjectID(id) })
            return team
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
export default apolloServer.createHandler({ path: '/api/teams' })