import {Link} from "react-router-dom";
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


    return (
        <>
            <div className="row">
                <Link onClick={joinRoom2} className="text-decoration-none" to="/serverchanneltwo">
                    <p className="discordColor3-t">
                        # Channel Vue
                    </p>
                </Link>
            </div>
        </>
    )
}

export default ServerChannel2;