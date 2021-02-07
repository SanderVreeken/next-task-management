import { request } from 'graphql-request'

export const createUser = (query: any, variables: any) => request('/api/users', query, variables)

export const usersFetcher = (query: string, team: string) => request('/api/users', query, { team })

export const updateUser = (query: any, variables: any) => request('/api/users', query, variables)
