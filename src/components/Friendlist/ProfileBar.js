import discordicon from "../../img/discordicon.png";
import {useEffect, useState} from "react";
import {socket} from "../socket";
import {Link} from "react-router-dom";

const ProfileBar = () => {
    const user = sessionStorage.getItem('user')
    const [users, setUsers] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [unseenMessages, setUnseenMessages] = useState([])

    useEffect(() => {
        socket.on('usersList', data => {
            const uniqueUsers = Array.from(new Set(data.map(item => [item.id, item.userName])))
            setUsers([uniqueUsers])
            setOnlineUsers([uniqueUsers.length])
        })

        socket.on('unseenMessages', data => {
            setUnseenMessages(data)
        })

    })


    return (
        <>
            {users.map((user, index) => {
                return (
                    <div key={index} className="d-flex align-items-end align-self-end">
                        {user.map((userName) => {
                            const privateUser = (data) => {
                                socket.emit('privateChat', data)
                            }
                            if(userName[1] === sessionStorage.getItem('user')) {
                                return (
                                <>
                                <div className="col align-self-center">
                                    <Link  className="text-decoration-none discordColor2" onClick={() => privateUser(userName[0])} to="/privatechat">
                                        <img alt="serverIcon" className="friendIcon" src={discordicon}/>
                                        <span className="discordColor3-t">{userName[1]}</span>
                                    </Link>
                                </div>
                                <div className="col align-self-center discordColor3-t">
                                    <i className="fa-solid fa-xl me-2 fa-microphone"></i>
                                    <i className="fa-solid fa-xl me-2 fa-headphones"></i>
                                    <i className="fa-solid fa-xl fa-gear"></i>
                                </div>
                                </>
                            )}
                        })}
                    </div>
                )
            })}
        </>
    )
}

export default ProfileBar;