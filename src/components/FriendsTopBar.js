import React from "react";
import {useAuth} from "./auth";
import {useNavigate} from 'react-router-dom'
import {socket} from "./socket";

const FriendsTopBar = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {

        socket.emit('logoutUser', sessionStorage.getItem('user'))
        auth.logout()
        navigate('/')
    }

    return (
        <div className="row discordColor3 border-bottom border-dark discordColor3-t">
            <div className="col align-items-center d-inline-flex text-white">
                <i className="fa-solid me-2  fa-xl fa-circle-user"></i>
                <span className="me-5 fw-bold align-middle">
                    Friends
                </span>
                <span className="align-middle fw-bold me-4">Online</span>
                <span className="align-middle discordColor3-t me-4">All</span>
                <span className="align-middle discordColor3-t me-4">Pending</span>
                <span className="align-middle discordColor3-t me-4">Blocked</span>
                <div className="buttonWidth">
                    <button type="button" className="btn btn-success">Add friend</button>
                </div>
                <div className="buttonWidth">
                    <button type="button" onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            </div>
            <div className="col-auto align-self-center discordColor3-t">
                <i className="fa-solid me-4 fa-xl fa-message"></i>
                <i className="fa-solid me-3 fa-xl fa-inbox"></i>
                <i className="fa-solid fa-xl fa-circle-question"></i>
            </div>
        </div>
    )
}

export default FriendsTopBar;