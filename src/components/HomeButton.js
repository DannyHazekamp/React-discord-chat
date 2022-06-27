import {NavLink} from "react-router-dom";
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
            <NavLink onClick={toHome} data-toggle="tooltip" data-placement="right" title="To home" className="align-self-center border-bottom border-secondary" to="/home">
                <i className="fa-brands discordColor3-t fa-3x fa-discord"></i>
            </NavLink>
        </>
    )
}

export default HomeButton;