import Header from "./Header";
import ServerList from "./ServerList";
import FriendList from "./FriendList";
import FriendsTopBar from "./Friendlist/FriendsTopBar";
import FriendStatus from "./Friendlist/FriendStatus";
import React, {useEffect, useState} from "react";
import {socket} from "./socket";
import discordicon from "../img/discordicon.png";
import {Link} from "react-router-dom";


const Home = () => {

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


        socket.on('userLogout', data => {

        })
    })

    return (
        <>
        <div className="row h-auto m-auto">
            <Header></Header>
        </div>
        <div className="row h-100 m-auto">
            <div className="col-sm-1 d-flex align-items-sm-end align-items-md-start align-items-lg-start justify-content-center  col-md-1 col-lg-1 discordColor1">
                <ServerList></ServerList>
            </div>
            <div className="discordColor2 col-sm-2 col-md-2 col-lg-2">
                <FriendList></FriendList>
            </div>
            <div className="col-sm-9 col-md-9 col-lg-9 discordColor3 me-0">
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
                            {users.map((user) => {
                            return (
                                    user.map((userName, index) => {
                                        const privateUser = (data) => {
                                            socket.emit('privateChat', data)
                                        }
                                        return (
                                            <div key={index} className=" border-top border-secondary pe-0 row align-content-center">
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                                                    <Link className="text-decoration-none" onClick={() => privateUser(userName[0])} to="/privatechat">
                                                        <img alt="serverIcon" className="friendIcon" src={discordicon}/>
                                                    </Link>
                                                </div>
                                                <div className="col-4 text-wrap text-break col-sm-4 col-md-4 col-lg-4">
                                                    <span className="text-white fw-bold">{userName[1]}</span> <br></br>
                                                    <span className="discordColor3-t">Online</span>
                                                </div>
                                                <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center align-middle discordColor3-t">
                                                    <Link className="text-decoration-none" onClick={() => privateUser(userName[0])} to="/privatechat">
                                                        <i className="fa-solid me-4 fa-xl align-middle fa-message"></i>
                                                    </Link>
                                                    {userName[0] === socket.id ? unseenMessages.filter(p => p.room === socket.id).length + ' messages obtained' : unseenMessages.filter(p => p.room !== socket.id && p.room === userName[0] && p.username === sessionStorage.getItem('user')).length + ' messages sent'}
                                                </div>
                                            </div>
                                    )
                                    })
                            )
                            })}
                        </div>
                    </div>
                    <div className="col-3">
                        <FriendStatus />
                            {users.map((user, index) => {
                                return (
                                    <div key={index} className="row">
                                        <ul className="messageWindow text-truncate list-group mh-100" id="users">
                                            {user.map((userName) => {
                                                return (
                                                    <li key={userName[0]} className="fontSize p-1 discordColor3-t">{userName[1]} </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
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