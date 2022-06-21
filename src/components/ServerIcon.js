import * as React from "react";
import discordicon from "../img/discordicon.png"
import {Routes, Route, Link} from "react-router-dom";
import DiscordServer from "./pages/DiscordServer";
import {socket} from "./socket";
const ServerIcon = () => {

    const room = 'React'
    const userName = sessionStorage.getItem('user')
    const joinRoom = () => {
        socket.emit('setRoom', {room, userName})
    }

    return (

                <Link onClick={joinRoom} to="/server">
                     <img alt="serverIcon" className="img-fluid" src={discordicon} />
                </Link>
    )
}

export default ServerIcon;