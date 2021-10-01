import { io } from './index'
import { Socket } from 'socket.io'
import { IGroup, INote } from './models/types'

export const socket = {
    listen: () => {
        io.on('connection', (socket: Socket) => {
            let room = ''
            socket.on('joinRoom', (roomId: string) => {
                room = roomId
                socket.join(roomId)
                console.log(`socket conn ${roomId} '-' ${socket.id}`)
            })

            socket.on('newNote', (note: INote) => {
                socket.to(room).emit('newNote', note)
            })

            socket.on('deleteNote', (id: number) => {
                socket.to(room).emit('deleteNote', id)
            })
        
            socket.on('editNote', (data: any) => {
                socket.to(room).emit('editNote', data)
            })

            socket.on('fixedNote', (data: any) => {
                socket.to(room).emit('fixedNote', data)
            })

            socket.on('unFixedNote', (data: any) => {
                socket.to(room).emit('unFixedNote', data)
            })

            socket.on('newGroup', (group: IGroup) => {
                socket.to(room).emit('newGroup', group)
            })
        })
    }
}