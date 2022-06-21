import {Link} from "react-router-dom";
import {socket} from "./socket";
const ServerChannel = () => {
    const room = 'React'
    const otherRoom = 'Vue'
    const userName = sessionStorage.getItem('user')
    const joinRoom = () => {
        socket.emit('leaveRoom', {otherRoom, userName})
        socket.emit('setRoom', {room, userName})
    }

    return (
        <>
            <div className="row">
                <Link onClick={joinRoom} className="text-decoration-none" to="/server">
                    <p className=" text-decoration-none discordColor3-t">
                        # Channel React
                    </p>
                </Link>
            </div>
        </>
    )
}

export default ServerChannel;