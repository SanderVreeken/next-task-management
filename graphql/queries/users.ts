export const READ_USERS_QUERY = /* GraphQL */ `
    query($team: String!) {
        readUsers(team: $team) {
            _id
            firstName
            lastName
            team
        }
    }
`