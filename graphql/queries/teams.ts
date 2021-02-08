export const CREATE_TEAM_QUERY = /* GraphQL */ `
    mutation($title: String!, $user: String!) {
        createTeam(title: $title, user: $user) {
            _id
            admins
            createdAt
            createdBy
            title
            subtitle
        }
    }
`

export const READ_TEAM_QUERY = /* GraphQL */ `
    query($id: String!) {
        readTeam(id: $id) {
            _id
            admins
            createdAt
            createdBy
            title
            subtitle
        }
    }
`