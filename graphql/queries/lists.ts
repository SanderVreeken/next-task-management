export const READ_LISTS_QUERY = /* GraphQL */ `
    query($team: String!) {
        readLists(team: $team) {
            _id
            order
            team
            title
        }
    }
`