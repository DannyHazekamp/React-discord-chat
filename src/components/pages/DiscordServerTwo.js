import Header from "../Header";
import ServerChannels from "../ServerChannels";
import ServerList from "../ServerList";
import ChannelTopBar from "../ChannelTopBar";
import ChannelChatTwo from "../ChannelChatTwo";
import {useEffect, useState} from "react";
import {socket} from "../socket";



const DiscordServerTwo = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.on('roomUsers', data => {
            const uniqueUsers = Array.from(new Set(data.map(item => item.userName)))
            setUsers( [uniqueUsers])
        })
    });

    return (
        <>
            <div className="DiscordServerTwo">
                <div className="row">
                    <Header></Header>
                </div>
                <div className="row min-vh-100">
                    <div className="col-1 sideBar-w discordColor1">
                        <h1 className="text-white">Ch 2</h1>
                        <ServerList></ServerList>
                    </div>
                    <div className="col-2 discordColor2">
                        <ServerChannels />
                    </div>
                    <div className="col-9 discordColor3">
                        <ChannelTopBar />
                        <div className="row">
                            <div className="col-9">
                                <ChannelChatTwo />
                            </div>
                            <div className="text-white discordColor2 col-3">
                                {users.map((el, index) => {
                                    return (
                                        <ul className="messageWindow list-group mh-100" key={index} id="users">
                                            {el.map((userName, index) => {
                                                return (
                                                    <li className="fontSize p-1 discordColor3-t" key={index}> {userName}  </li>
                                                )
                                            })}
                                        </ul>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiscordServerTwo;