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
            </div>
        </div>
    )
}

export default FriendsTopBar;