import { request } from 'graphql-request'

export const usersFetcher = (query: string, team: string) => request('/api/users', query, { team })
