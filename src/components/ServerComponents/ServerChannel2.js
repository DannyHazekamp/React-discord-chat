import {Link, NavLink} from "react-router-dom";
import {socket} from "../socket";

const ServerChannel2 = () => {
    const room = 'Vue'
    const otherRoom = 'React'
    const userName = sessionStorage.getItem('user')
    const joinRoom2 = () => {
        socket.emit('leaveRoom', {otherRoom, userName})
        socket.emit('setRoom', {room, userName})
        socket.emit('userToHome')
    }

    let activeClassName = "discordColor3-t border-3 border-bottom border-primary";

    return (
        <>
            <div className="row">
                <NavLink onClick={joinRoom2} className="text-decoration-none" to="/serverchanneltwo">
                    {({ isActive }) => (
                        <span className={ isActive ? activeClassName : 'discordColor3-t text-decoration-none' }>
                            # Channel Vue
                        </span>
                    )}
                </NavLink>
            </div>
        </>
    )
}

export default ServerChannel2;