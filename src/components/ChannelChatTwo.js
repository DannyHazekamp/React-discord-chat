import io from "socket.io-client";
import {useEffect, useState} from "react";
import {useAuth} from "./auth";
import {socket} from './socket'
//const socket = io.connect("http://localhost:7000");
const ChannelChatTwo = () => {

    const auth = useAuth()
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const userName = sessionStorage.getItem('user')
    const room = 'Vue'

    useEffect(() => {
        socket.on('message', payload => {
            setChat([payload])
        })
    });


    const sendMessage2 = (e) => {
        e.preventDefault();
        console.log(message);
        socket.emit('message', {userName, message, room})
        setMessage('')
    }

    return (
        <>
            <div className="row vh-100 text-white">
                <ul className="messageWindow list-group mh-100" id="messages">
                    {chat.map((payload, index) => {
                        return (
                            <>
                                {payload.map((data, index) => {
                                    return (
                                        <li key={index} className="fontSize p-1 discordColor3-t"> {data.userName}: <span>{data.message}</span></li>
                                    )
                                })}
                            </>
                        )
                    })}
                </ul>
            </div>
            <form id="form" onSubmit={sendMessage2} className="row h-auto mt-5 align-items-end">
                <div className="col-10 g-0">
                    <input type="text" id="input" value={message} onChange={(e) => {setMessage(e.target.value)}} className="align-self-end me-0 form-control" />
                </div>
                <div className="col-2 g-0">
                    <button type="submit" className="btn ms-0 btn-success">Send</button>
                </div>
            </form>
        </>
    )
}

export default ChannelChatTwo;