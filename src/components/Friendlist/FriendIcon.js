import discordicon from "../../img/discordicon.png";
import {useEffect, useState} from "react";
import {socket} from "../socket";

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
            console.log(data)
            console.log(socket.id)
            setUnseenMessages(data)

            console.log(unseenMessages)
            console.log('you have unseen messages')
        })
    })


            return (
                <>
                    {users.map((user, index) => {
                        return (
                            <div key={index} className="row">
                                {user.map((userName) => {
                                    return (
                                        <a href="src/components/Friendlist/FriendIcon#"
                                           className="text-decoration-none discordColor2 py-2 ripple" aria-current="true">
                                            <img alt="serverIcon" className="friendIcon" src={discordicon}/>
                                            <span className="discordColor3-t">{userName[1]}</span>
                                        </a>
                                    )
                                })}
                            </div>
                        )
                    })}
                </>
            )
}
export default FriendIcon;