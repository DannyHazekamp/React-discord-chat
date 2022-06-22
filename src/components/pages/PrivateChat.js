import Header from "../Header";
import ServerList from "../ServerList";
import FriendList from "../FriendList";
import {useEffect, useState} from "react";
import {socket} from "../socket";

const PrivateChat = () => {

    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [room, setRoom] = useState('')
    const userName = sessionStorage.getItem('user')

    useEffect(() => {

        socket.on('userJoined', payload => {
            console.log(payload)
            console.log(socket.id)
            if(payload !== socket.id) {
                setRoom(payload)
            }
        })

        socket.on('userJoinedSelf', payload => {
            if(payload === socket.id) {
                setRoom(payload)
            }
        })

        socket.on('privateMessage', payload => {
            console.log(payload)
            console.log(room)
            let chatRoom = payload.filter(p => p.room === room || p.room === socket.id)
            setChat([chatRoom])
        })
    });


    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('messagePrivate', {userName, message, room})
        setMessage('')
    }


    return (
        <>
            <div className="row">
                <Header></Header>
            </div>
            <div className="row min-vh-100">
                <div className="col-1 sideBar-w discordColor1">
                    <ServerList></ServerList>
                </div>
                <div className="discordColor2 col-2">
                    <FriendList></FriendList>
                </div>
                <div className="col-9 discordColor3 me-0">
                    <div className="row vh-100 text-white">
                        <ul className="messageWindow list-group mh-100" id="messages">
                            {chat.map((payload, index) => {
                                return (
                                    <>
                                    {payload.filter(p => p.room === room).map((data, index) => {
                                            return (
                                                <li key={data.room}
                                                    className="fontSize p-1 discordColor3-t">{data.room} {data.userName}: <span>{data.message}</span>
                                                </li>
                                            )
                                    })}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                    <form id="form" onSubmit={sendMessage} className="row h-auto mt-5 align-items-end">
                        <div className="col-10 g-0">
                            <input type="text" id="input" value={message} onChange={(e) => {setMessage(e.target.value)}} className="align-self-end me-0 form-control" />
                        </div>
                        <div className="col-2 g-0">
                            <button type="submit" className="btn ms-0 btn-success">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PrivateChat;