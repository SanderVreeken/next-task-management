import { request } from 'graphql-request'

export const createTeam = (query: any, variables: any) => request('/api/teams', query, variables)

export const teamFetcher = (query: string, id: string) => request('/api/teams', query, { id })
