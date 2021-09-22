import sequelize from '../db'
import { Model, DataTypes } from 'sequelize'

interface UserInstance extends Model {
    id: number
    name: string
    email: string
    password: string
    avatar: string
}

export interface NoteInstance extends Model {
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

interface GroupInstance extends Model {
    id: number
    title: string
    user_id: number
    createdAt: string
    updatedAt: string
}

export const User = sequelize.define<UserInstance>('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING}
})

export const Note = sequelize.define<NoteInstance>('note', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
    group_id: {type: DataTypes.INTEGER, allowNull: false},
    fixed: {type: DataTypes.BOOLEAN, defaultValue: false},
    tags: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false}
})

export const Group = sequelize.define<GroupInstance>('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
})
