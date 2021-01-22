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
            flagged
            list
            tags
            team
            title
        }
    }
`

export const UPDATE_TASK_QUERY = /* GraphQL */ `
    mutation($id: String!, $list: Int!) {
        updateTask(id: $id, list: $list) {
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
            tags
            team
            title
        }
    }
`