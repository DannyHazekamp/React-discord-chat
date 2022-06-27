import * as React from "react";
import { NavLink} from "react-router-dom";
import {socket} from "./socket";
const ServerIcon = () => {

    const room = 'React'
    const userName = sessionStorage.getItem('user')
    const joinRoom = () => {
        socket.emit('setRoom', {room, userName})
        socket.emit('userToHome')
    }

    return (

                <NavLink onClick={joinRoom} data-toggle="tooltip" data-placement="right" title="To server" className="align-self-center" to="/server">
                    <i className="fa-brands discordColor3-t fa-3x fa-discord"></i>
                </NavLink>
    )
}

export default ServerIcon;