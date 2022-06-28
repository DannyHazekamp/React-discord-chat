import Header from "../Header";
import ServerList from "../ServerList";
import FriendList from "../FriendList";
import {useEffect, useState} from "react";
import {socket} from "../socket";
import React from "react";

const PrivateChat = () => {

    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [room, setRoom] = useState('')
    const userName = sessionStorage.getItem('user')

    useEffect(() => {

        socket.on('userJoined', payload => {
            if(payload !== socket.id) {
                setRoom(payload)
            }
        })

        socket.on('userJoinedSelf', payload => {
            if(payload === socket.id) {
                setRoom(payload)
            }
        })

        socket.on('usersList', data => {
            const uniqueUsers = Array.from(new Set(data.map(item => [item.id, item.userName])))
            setUsers([uniqueUsers])
        })

        socket.on('privateMessage', payload => {
            let chatRoom = payload.filter(p => p.room === room)
            setChat([chatRoom])
        })
    });

    const sendMessage = (e) => {
        e.preventDefault();
        if(message === '') {
            return false;
        } else {
            socket.emit('messagePrivate', {userName, message, room})
            socket.emit('messagesUnseen', {userName, message, room})
            setMessage('')
        }
    }

    return (
        <>
            <div className="row m-auto">
                <Header></Header>
            </div>
            <div className="row m-auto min-vh-100">
                <div className="col-sm-1 col-md-1 col-lg-1 sideBar-w discordColor1">
                    <ServerList></ServerList>
                </div>
                <div className="discordColor2 col-sm-2 col-md-2 col-lg-2">
                    <FriendList></FriendList>
                </div>
                <div className="col-sm-9 col-md-9 col-lg-9">
                    <div className="row">
                        <div className="col-9 discordColor3 me-0">
                            <div className="row vh-100 text-white">
                                <ul className="messageWindow list-group mh-100" id="messages">
                                    {chat.map((payload) => {
                                        return (
                                            payload.filter(p => p.room === room).map((data, index) => {
                                                    return (
                                                        <li key={index}
                                                            className="fontSize p-1 discordColor3-t">{data.userName}: <span>{data.message}</span>
                                                        </li>
                                                    )
                                            })
                                        )
                                    })}
                                </ul>
                            </div>
                            <form id="form" onSubmit={sendMessage} className="row h-auto mt-5 align-items-end">
                                <div className="col-10 g-0">
                                    <input type="text" id="input" required="required" value={message} onChange={(e) => {setMessage(e.target.value)}} className="align-self-end me-0 form-control" />
                                </div>
                                <div className="col-2 g-0">
                                    <button type="submit" className="btn w-100 ms-0 btn-success">Send</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-3 px-1 discordColor2">
                            <h1 className="text-white fw-bold">Active now</h1>
                            {users.map((user, index) => {
                                return (
                                    <ul className="messageWindow text-truncate list-group mh-100" key={index} id="users">
                                        {user.map((userName, index) => {
                                            return (
                                                <li className="fontSize discordColor3-t" key={index}>{userName[1]} </li>
                                            )
                                        })}
                                    </ul>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivateChat;