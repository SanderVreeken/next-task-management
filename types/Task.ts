import TagT from './Tag'
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
    tags: TagT[]
    team: string
    title: string
}

export default TaskT