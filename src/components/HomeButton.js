import {NavLink, useLocation} from "react-router-dom";
import {socket} from "./socket";


const HomeButton = () => {
    const user = sessionStorage.getItem('user')
    const roomReact = 'React'
    const roomVue = 'Vue'
    const toHome = () => {

        socket.emit('leaveRooms', {user, roomReact, roomVue})
        socket.emit('userToHome')
    }

    let activeClassName = " border-4 border-bottom border-primary";
    let location = useLocation().pathname

    return (
        <>
            <NavLink onClick={toHome} data-toggle="tooltip" data-placement="right" title="To home" className="align-self-center active border-bottom border-secondary" to="/home">
                {({ isActive }) => (
                    <span className={ isActive || location === "/privatechat" ? activeClassName : undefined }>
                        <i className="fa-brands discordColor3-t fa-3x fa-discord"></i>
                    </span>
                )}
            </NavLink>
        </>
    )
}

export default HomeButton;