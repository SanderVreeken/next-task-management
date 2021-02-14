export const READ_LOGS_QUERY = /* GraphQL */ `
    query($team: String!) {
        readLogs(team: $team) {
            _id
            action
            date
            item {
                _id
                assignedTo {
                    _id
                    firstName
                    lastName
                    team
                }   
                attachments
                createdAt
                createdBy {
                    _id
                    firstName
                    lastName
                    team
                }
                description
                dueDate
                flagged
                list
                tags {
                    _id
                    team
                    title
                }
                team
                title
            }
            team
            type
            user {
                _id
                firstName
                lastName
                team
            }
        }
    }
`