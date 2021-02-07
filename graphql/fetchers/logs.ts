import { request } from 'graphql-request'

export const logsFetcher = (query: string, team: string) => request('/api/logs', query, { team })
