import discordicon from "../../img/discordicon.png";
import {useEffect, useState} from "react";
import {socket} from "../socket";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useAuth} from "../auth/auth";

const ProfileBar = () => {
    const [users, setUsers] = useState([])

    const [user, setUser] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()

    const handleUpdate = () => {
        if(user === '') {
            return false;
        } else {
            socket.emit('updateUser', {newUser: user, oldUser: sessionStorage.getItem('user')})

            auth.login(user)
            navigate('/home', {replace: true})
        }
    }

    const handleLogout = () => {
        socket.emit('logoutUser', sessionStorage.getItem('user'))
        auth.logout()
        navigate('/')
    }

    useEffect(() => {
        socket.on('usersList', data => {
            const uniqueUsers = Array.from(new Set(data.map(item => [item.id, item.userName])))
            setUsers([uniqueUsers])
        })


    })
    return (
            users.map((user, index) => {
                return (
                    <div key={index} className="row align-items-end align-self-end">
                        {user.map((userName) => {
                            const privateUser = (data) => {
                                socket.emit('privateChat', data)
                            }
                            if(userName[1] === sessionStorage.getItem('user')) {
                                return (
                                <div className="d-flex  text-truncate flex-wrap" key={userName[0]}>
                                <div className="col text-wrap align-self-center">
                                    <img alt="serverIcon" className="friendIcon" src={discordicon}/>
                                    <span className=" text-truncate discordColor3-t">{userName[1]}</span>
                                </div>
                                <div className="col align-self-center discordColor3-t">
                                    <Link  className="text-decoration-none btn btn-link p-0 discordColor3" onClick={() => privateUser(userName[0])} to="/privatechat">
                                        <i className="text-decoration-none fa-solid px-1 fa-xl fa-inbox"></i>
                                    </Link>
                                    <button className="discordColor2 btn p-0 btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i className="fa-solid fa-xl px-1 discordColor3-t fa-solid fa-gear"></i>
                                    </button>
                                    <button className="discordColor2 btn p-0 btn-link" onClick={handleLogout}>
                                        <i className="fa-solid fa-xl px-1  discordColor3-t fa-arrow-right-from-bracket"></i>
                                    </button>
                                </div>

                                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog discordColor2">
                                            <div className="modal-content modalBorder discordColor3-t">
                                                <div className="modal-header discordColor3">
                                                    <h5 className="modal-title fw-bold text-white" id="exampleModalLabel">Profile settings</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body discordColor3">
                                                    <form>
                                                        <div className="mb-3">
                                                            <label htmlFor="username" className="text-white form-label">Username</label>
                                                            <input type="text" maxLength="20" required="required" defaultValue={userName[1]} placeholder={userName[1]} onChange={(e) => {setUser(e.target.value)}} className="form-control" id="username" aria-describedby="usernameHelp" />
                                                        </div>
                                                        <button type="button" className="btn text-white btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="submit" onClick={handleUpdate} data-bs-dismiss="modal" className="btn btn-primary">Done</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            else {
                                return false
                            }
                        })}
                    </div>
                )
            })

    )
}

export default ProfileBar;