export const CREATE_USER_QUERY = /* GraphQL */ `
    mutation($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
        createUser(email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
            _id
            createdAt
            email
            firstName
            lastName
            team
            token
        }
    }
`

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

export const UPDATE_USER_QUERY = /* GraphQL */ `
    mutation($id: String!, $email: String!, $firstName: String!, $lastName: String!, $team: String) {
        updateUser(id: $id, email: $email, firstName: $firstName, lastName: $lastName, team: $team) {
            _id
            createdAt
            email
            firstName
            lastName
            team
            token
        }
    }
`

export const VALIDATE_USER_QUERY = /* GraphQL */ `
    query($email: String!, $password: String!) {
        validateUser(email: $email, password: $password) {
            _id
            createdAt
            email
            firstName
            lastName
            team
            token
        }
    }
`