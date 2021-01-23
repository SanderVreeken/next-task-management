import { request } from 'graphql-request'

export const tagsFetcher = (query: string, team: string) => request('/api/tags', query, { team })
