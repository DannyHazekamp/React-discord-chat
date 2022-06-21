import {Link} from "react-router-dom";
import {socket} from "./socket";

const HomeButton = () => {
    const user = sessionStorage.getItem('user')
    const roomReact = 'React'
    const roomVue = 'Vue'
    const toHome = () => {

        socket.emit('leaveRooms', {user, roomReact, roomVue})
        socket.emit('userToHome')
    }

    return (
        <>
            <Link onClick={toHome} className="align-self-center" to="/home">
                <i className="fa-brands discordColor3-t fa-3x fa-discord"></i>
            </Link>
        </>
    )
}

export default HomeButton;