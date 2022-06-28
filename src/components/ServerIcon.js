import * as React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {socket} from "./socket";
const ServerIcon = () => {

    const room = 'React'
    const userName = sessionStorage.getItem('user')
    const joinRoom = () => {
        socket.emit('setRoom', {room, userName})
        socket.emit('userToHome')
    }

    let activeClassName = "border-5 border-bottom border-primary";
    let location = useLocation().pathname
    return (

                <NavLink onClick={joinRoom} data-toggle="tooltip" data-placement="right" title="To server" className="align-self-center" to="/server">
                    {({ isActive }) => (
                        <span className={ isActive || location === "/serverchanneltwo" ? activeClassName : undefined }>
                            <i className="fa-brands discordColor3-t fa-3x fa-discord"></i>
                        </span>
                    )}
                </NavLink>
    )
}

export default ServerIcon;