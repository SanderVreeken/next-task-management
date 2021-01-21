import UserT from './User'

type TaskT = {
    _id: string
    assignedTo: UserT[]
    attachments?: number
    createdAt: number
    createdBy: UserT
    description?: string
    dueDate: number
    flagged: boolean
    list: number
    tags: string[]
    team: string
    title: string
}

export default TaskT