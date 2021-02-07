const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

import { ApolloServer, gql } from 'apollo-server-micro'
import { ObjectID } from 'mongodb'

import { connectToDatabase } from '../../utils/mongodb'

const key = '7c98de0c-dc43-4424-8654-f9774c872b08'

type Props = {
    id: string
    email: string
    firstName: string
    lastName: string
    password: string
    team: string
}

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        createdAt: user.createdAt,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        team: user.team
    }, key, {
        expiresIn: '1h'
    })
}

const typeDefs = gql`
    type Mutation {
        createUser(email: String!, firstName: String!, lastName: String!, password: String!): User!
        updateUser(id: String!, email: String!, firstName: String!, lastName: String!, team: String): User!
    }
    type Query {
        readUsers(team: String!): [User]!
    }
    type User {
        _id: ID!
        createdAt: Float
        email: String
        firstName: String!
        lastName: String!
        team: String
        token: String
    }
`

const resolvers = {
    Mutation: {
        async createUser(_: any, { email, firstName, lastName, password }: Props) {
            const { db } = await connectToDatabase()
            
            try { 
                const user: { _id?: string, createdAt: number, email: string, firstName: string, lastName: string, password: string, team: string } = {
                    createdAt: new Date().valueOf(),
                    email,
                    firstName,
                    lastName,
                    password: await bcrypt.hash(password, 12),
                    team: null
                }

                await db.collection('users').insertOne(user)

                const token = generateToken({
                    _id: user._id,
                    createdAt: user.createdAt,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    team: user.team,
                })

                return {
                    _id: user._id,
                    createdAt: user.createdAt,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    team: user.team,
                    token
                }
            } catch(error) {
                throw new Error(error)
            }
        },
        async updateUser(_: any, { id, email, firstName, lastName, team }: Props) {
            const { db } = await connectToDatabase()
            
            try { 
                const user = await db.collection('users').findOne({ _id: ObjectID(id) })

                user.email = email
                user.firstName = firstName
                user.lastName = lastName
                user.team = team

                await db.collection('users').updateOne({ _id: ObjectID(id) }, { $set: user })

                return {
                    _id: user._id,
                    createdAt: user.createdAt,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    team: user.team
                }
            } catch(error) {
                throw new Error(error)
            }
        }
    },
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