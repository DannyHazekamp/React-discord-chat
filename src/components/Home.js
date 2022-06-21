import Header from "./Header";
import ServerList from "./ServerList";
import FriendList from "./FriendList";
import FriendsTopBar from "./FriendsTopBar";
import FriendOverview from "./FriendOverview";
import FriendStatus from "./FriendStatus";
import React, {useEffect, useState} from "react";
import {useAuth} from "./auth";
import {socket} from "./socket";
import discordicon from "../img/discordicon.png";
import {Link} from "react-router-dom";


const Home = () => {

    const [users, setUsers] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(() => {
        socket.on('usersList', data => {
            console.log(data)
            const uniqueUsers = Array.from(new Set(data.map(item => [item.id, item.userName])))
            console.log(JSON.stringify(uniqueUsers))
            setUsers([uniqueUsers])
            setOnlineUsers([uniqueUsers.length])
        })


        socket.on('userLogout', data => {

        })
    })
    console.log(JSON.stringify(users))

    const auth = useAuth()
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
            <FriendsTopBar />
            <div className="row">
                <div className="col-9 border-right-1 border-secondary ">
                    <div className="row">
                        <div className="searchHeight2">
                            <input type="text" className="w-100 searchbar-w mt-4 form-h form-control discordColor1" placeholder="Find or start a conversation"/>
                            <p className="discordColor3-t"> online: {onlineUsers}</p>
                        </div>
                    </div>
                    <div className="row g-0">
                        {users.map((user, index) => {
                        return (
                            <>
                                {user.map((userName) => {
                                    const privateUser = (data) => {
                                        socket.emit('privateChat', data)
                                    }
                                    return (
                                        <>
                                        <div key={index} className=" border-top border-secondary row align-content-center">
                                            <div className="col">
                                                <a href="src/components/Friendlist/FriendIcon#"
                                                   className="text-decoration-none  ripple" aria-current="true">
                                                    <img alt="serverIcon" className="friendIcon" src={discordicon}/>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <span className="discordColor3-t">{userName[1]}</span>
                                                <span>Status</span>
                                            </div>
                                            <div className="col discordColor3-t">
                                                <Link className="text-decoration-none" onClick={() => privateUser(userName[0])} to="/privatechat">
                                                    <i className="fa-solid me-4 fa-xl fa-message"></i>
                                                </Link>
                                                <i className="fa-solid fa-xl fa-ellipsis-vertical"></i>
                                            </div>
                                        </div>
                                        </>
                                )
                                })}
                        </>
                        )
                        })}
                    </div>
                </div>
                <div className="col-3 ">
                    <FriendStatus />
                        {/*{users.map((user, index) => {*/}
                        {/*            return (<li className="fontSize p-1 discordColor3-t" key={index}> {index} {user.userName}  </li>)*/}
                        {/*    })}*/}
                        {users.map((user, index) => {
                            return (
                                <ul className="messageWindow list-group mh-100" key={index} id="users">
                                    {user.map((userName, index) => {
                                        return (
                                            <li className="fontSize p-1 discordColor3-t" key={index}>{userName[1]} </li>
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

export default Home;