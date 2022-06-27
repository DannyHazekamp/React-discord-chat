import Header from "../Header";
import ServerChannels from "../ServerChannels";
import ServerList from "../ServerList";
import ChannelTopBar from "../ChannelTopBar";
import ChannelChat from "../ChannelChat";
import {useEffect, useState} from "react";
import {socket} from "../socket";


const DiscordServer = () => {



    const [users, setUsers] = useState([])
    useEffect(() => {

        socket.on('roomUsers', data => {
            const uniqueUsers = Array.from(new Set(data.map(item => item.userName)))
            setUsers( [uniqueUsers])

        })
    });

    return (
        <>
                <div className="row h-auto m-auto">
                    <Header></Header>
                </div>
                <div className="row m-auto h-auto">
                    <div className=" col-sm-1 col-md-1 col-lg-1 sideBar-w discordColor1">
                        <ServerList></ServerList>
                    </div>
                    <div className="col-sm-2 col-md-2 col-lg-2 discordColor2">
                        <ServerChannels />
                    </div>
                    <div className="col-sm-9 col-md-9 col-lg-9 discordColor3">
                        <ChannelTopBar />
                        <div className="row min-vh-100">
                            <div className="col-9">
                                <ChannelChat />
                            </div>
                                <div className="text-white discordColor2 col-3">
                                    <h1 className="text-white fw-bold">Active now</h1>
                                    {users.map((el, index) => {
                                        return (
                                            <ul className="messageWindow list-group mh-100" key={index}  id="users">
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
        </>
    )
}

export default DiscordServer;