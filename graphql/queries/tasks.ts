export const READ_TASKS_QUERY = /* GraphQL */ `
    query($team: String!) {
        readTasks(team: $team) {
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
            list
            tags
            team
            title
            flagged
        }
    }
`