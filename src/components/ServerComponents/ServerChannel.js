import {NavLink} from "react-router-dom";
import {socket} from "../socket";
const ServerChannel = () => {
    const room = 'React'
    const otherRoom = 'Vue'
    const userName = sessionStorage.getItem('user')
    const joinRoom = () => {
        socket.emit('leaveRoom', {otherRoom, userName})
        socket.emit('setRoom', {room, userName})
        socket.emit('userToHome')
    }

    let activeClassName = "discordColor3-t border-3 border-bottom border-primary";
   // let location = useLocation().pathname

    return (
        <>
            <div className="row">
                <NavLink onClick={joinRoom} className="text-decoration-none" to="/server">
                    {({ isActive }) => (
                        <span className={ isActive ? activeClassName : 'discordColor3-t text-decoration-none' }>
                        # Channel React
                        </span>
                        )}
                </NavLink>
            </div>
        </>
    )
}

export default ServerChannel;