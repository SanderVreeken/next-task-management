export const READ_TAGS_QUERY = /* GraphQL */ `
    query($team: String!) {
        readTags(team: $team) {
            _id
            team
            title
        }
    }
`