const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors:{
        origin:'*',
    }
})


let users = []
let usersRoom = []
let privateMessages = []
let reactMessages = []
let vueMessages = []
let unseenMessages = []
io.on('connection', socket =>{
    io.to(socket.id).emit('disconnected')
    socket.join(socket.id)

    socket.on('message', payload => {
        if(payload.room === 'React') {
            reactMessages.push(payload)
            io.in(payload.room).emit('message', reactMessages)
        } else {
            vueMessages.push(payload)
            io.in(payload.room).emit('message', vueMessages)
        }
    })

    socket.on('messagePrivate', payload => {
        privateMessages.push({room: payload.room, message: payload.message, userName: payload.userName})
        io.in(payload.room).emit('privateMessage', privateMessages)
        io.in(payload.room).emit('roomUsersPrivate', privateMessages)
    })

    socket.on('messagesUnseen', payload => {
        unseenMessages.push({room: payload.room, message: payload.message, username: payload.userName})
        io.sockets.emit('unseenMessages', unseenMessages)
    })

    socket.on('privateChat', data => {
        if(socket.id !== data) {
            socket.join(data)
            io.in(data).emit('userJoined', data)
            io.in(data).emit('privateMessage', privateMessages)
            io.in(data).emit('usersList', users)
        } else {
            socket.join(socket.id)
            io.in(data).emit('userJoinedSelf', socket.id)
            io.in(data).emit('privateMessage', privateMessages)
            io.in(data).emit('usersList', users)
        }
    })

    socket.on('logoutUser', user => {
        users = users.filter(p => p.userName !== user)
        io.sockets.emit('usersList', users)
    })

    socket.on('userToHome', () => {
        io.sockets.emit('usersList', users)
        io.sockets.emit('unseenMessages', unseenMessages)
    })


    socket.on('setUsers', user => {
        users.push({id: socket.id, userName: user});
        io.sockets.emit('usersList', users)
    })

    socket.on('setRoom', data => {
        try{
            console.log('A user','joined the room :',data.room)
            usersRoom.push({room: data.room, userName: data.userName})

            let usersReact = usersRoom.filter(p => p.room === 'React')
            let usersVue = usersRoom.filter(v => v.room === 'Vue')
            socket.join(data.room)
            if(data.room === 'React') {
                io.in(data.room).emit('roomUsers', usersReact)
                io.in(data.room).emit('message', reactMessages)
            } else {
                io.in(data.room).emit('roomUsers', usersVue)
                io.in(data.room).emit('message', vueMessages)
            }
        }catch(e) {
            console.log('[error]', 'join room :', e)
        }
    })

    socket.on('updateUser', data => {
        users = users.filter(p => p.userName !== data.oldUser)
        users.push({id: socket.id, userName: data.newUser})
        io.sockets.emit('usersList', users)
    })

    socket.on('leaveRoom', data => {
        try{
            console.log('A user','left the room :', data.otherRoom)
            usersRoom = usersRoom.filter(p => p.userName !== data.userName)
            socket.leave(data.otherRoom)
            socket.to(data.otherRoom).emit('roomUsers', usersRoom)
        }catch(e) {
            console.log('[error]', 'leave room :', e)
        }
    })

    socket.on('leaveRooms', data => {
        let filteredRoomUsers = usersRoom.filter(p => p.userName !== data.user)
        io.emit('roomUsers', filteredRoomUsers)
        socket.leave(data.roomReact)
        socket.leave(data.roomVue)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('updateUserList', (users) => {
        console.log(users);
    })

})

server.listen(7000,() => {
    console.log('I am listening!')
})
console.log('server started')