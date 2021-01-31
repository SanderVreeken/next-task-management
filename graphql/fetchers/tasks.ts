import { request } from 'graphql-request'

// TODO: Define the types as input for the queries below.
export const createTask = (query: any, variables: any) => request('/api/tasks', query, variables)

export const taskFetcher = (query: string, id: string, team: string) => request('/api/tasks', query, { id, team })
export const tasksFetcher = (query: string, team: string) => request('/api/tasks', query, { team })

// TODO: Define the types as input for the queries below.
export const updateTask = (query: any, variables: any) => request('/api/tasks', query, variables)


