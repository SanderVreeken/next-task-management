export const CREATE_TASK_QUERY = /* GraphQL */ `
    mutation($assignedTo: [String], $description: String, $dueDate: Float!, $list: Int!, $tags: [String], $team: String!, $title: String!, $user: String!) {
        createTask(assignedTo: $assignedTo, description: $description, dueDate: $dueDate, list: $list, tags: $tags, team: $team, title: $title, user: $user) {
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
    }
`

export const READ_TASK_QUERY = /* GraphQL */ `
    query($id: String!) {
        readTask(id: $id) {
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
    }
`


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
            tags {
                _id
                team
                title
            }
            team
            title
        }
    }
`

export const UPDATE_TASK_QUERY = /* GraphQL */ `
    mutation($id: String!, $assignedTo: [String], $attachments: Int, $createdAt: Float!, $createdBy: String!, $description: String, $dueDate: Float!, $editor: String! $flagged: Boolean!, $list: Int!, $tags: [String], $team: String!, $title: String!) {
        updateTask(id: $id, assignedTo: $assignedTo, attachments: $attachments, createdAt: $createdAt, createdBy: $createdBy, description: $description, dueDate: $dueDate, editor: $editor, flagged: $flagged, list: $list, tags: $tags, team: $team, title: $title) {
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
    }
`