import { request } from 'graphql-request'

export const listsFetcher = (query: string, team: string) => request('/api/lists', query, { team })
