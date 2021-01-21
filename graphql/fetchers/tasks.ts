import { request } from 'graphql-request'

export const tasksFetcher = (query: string, team: string) => request('/api/tasks', query, { team })
