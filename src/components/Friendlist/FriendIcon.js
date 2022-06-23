import discordicon from "../../img/discordicon.png";
import {useEffect, useState} from "react";
import {socket} from "../socket";
import {Link} from "react-router-dom";

const FriendIcon = () => {

    const [users, setUsers] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [unseenMessages, setUnseenMessages] = useState([])
    useEffect(() => {
        socket.on('usersList', data => {
            console.log(data)
            const uniqueUsers = Array.from(new Set(data.map(item => [item.id, item.userName])))
            console.log(JSON.stringify(uniqueUsers))
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
                            <div key={index} className="row">
                                {user.map((userName) => {
                                    const privateUser = (data) => {
                                        socket.emit('privateChat', data)
                                    }
                                    if(userName[1] !== sessionStorage.getItem('user')) {
                                        return (
                                            <Link className="text-decoration-none discordColor2" onClick={() => privateUser(userName[0])} to="/privatechat">
                                                <img alt="serverIcon" className="friendIcon" src={discordicon}/>
                                                <span className="discordColor3-t">{userName[1]}</span>
                                            </Link>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </>
            )
}
export default FriendIcon;