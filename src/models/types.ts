export interface IUser {
    id: number
    name: string
    email: string
    avatar: string
    password: string
}

export interface IGroup {
    id: number
    title: string
    color: string
    user_id: number
    createdAt: string
    updatedAt: string
}

export interface INote {
    id: number
    title: string
    text: string
    user_id: number
    group_id: number
    fixed: boolean
    tags: string[]
    createdAt: string
    updatedAt: string
}


