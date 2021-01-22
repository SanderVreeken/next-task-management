import { request } from 'graphql-request'

export const tasksFetcher = (query: string, team: string) => request('/api/tasks', query, { team })

// TODO: Define the types as input for the queries below.
export const updateTask = (query: any, variables: any) => request('/api/tasks', query, variables)


