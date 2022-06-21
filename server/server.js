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


io.on('connection', socket =>{
    console.log('connection made succesfully')
    socket.on('message', payload => {
        console.log('message received on server:  ', payload)
        io.in(payload.room).emit('message', payload)
        io.in(payload.room).emit('roomUsers', payload)
    })

    socket.on('messagePrivate', payload => {
        console.log('message received on server:  ', payload)
        privateMessages.push(payload)
        io.in(payload.room).emit('privateMessage', privateMessages)
        io.in(payload.room).emit('roomUsersPrivate', privateMessages)
    })

    socket.on('privateChat', data => {
         //socket.to(data).emit("private message", socket.id, 'hello there')
        console.log(data)
        socket.join(data)
        io.in(data).emit('userJoined', data)
        io.in(data).emit('privateMessage', privateMessages)
    })

    socket.on('logoutUser', user => {
        users = users.filter(p => p.userName !== user)
        io.sockets.emit('usersList', users)
    })

    socket.on('userToHome', () => {
        io.sockets.emit('usersList', users)
    })


    socket.on('setUsers', user => {
        users.push({id: socket.id, userName: user});
     //  users.push({userName: user})
        console.log(users)
        io.sockets.emit('usersList', users)
    })

    // socket.on('toHome', () => {
    //   socket.rooms.size === 0;
    // })

    socket.on('setRoom', data => {
        try{
            console.log('[socket]','join room :',data.room)

            usersRoom.push({room: data.room, userName: data.userName})

            let usersReact = usersRoom.filter(p => p.room === 'React')
            let usersVue = usersRoom.filter(v => v.room === 'Vue')
            console.log(usersRoom)
            socket.join(data.room)
            if(data.room === 'React') {
                io.in(data.room).emit('roomUsers', usersReact)
            } else {
                io.in(data.room).emit('roomUsers', usersVue)
            }
        }catch(e) {
            console.log('[error]', 'join room :', e)
        }
    } )

    socket.on('leaveRoom', data => {
        try{
            console.log('[socket]','left room :', data.otherRoom)
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