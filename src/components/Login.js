import {useState} from "react";
import { useNavigate } from 'react-router-dom'
import {useAuth} from "./auth";
import {socket} from './socket'
const Login = () => {

    const [user, setUser] = useState('')
    // const [room, setRoom] = useState('')
    const auth = useAuth()
    const navigate = useNavigate()

    const handleLogin = () => {
        if(user === '') {
            return false;
        } else {
            auth.login(user)
            // socket.emit('setRoom', room
            socket.emit('setUsers', user)
            // setRoom('')
            navigate('/home', {replace: true})
        }
    }

    return (
        <>
            <div className="container-fluid  min-vh-100 align-items-center discordColor3 discordColor3-t">
                <div className="row min-vh-100 justify-content-center">
                    <div className="col-7 offset-4 align-self-center">
                        <div className="card discordColor2 discordColor3-t w-50">
                            <div className="text-center card-header">
                                Login
                            </div>
                            <div className="card-body text-center">
                                <div className="row justify-content-center">
                                <form>
                                    <h5 className="card-title"><label htmlFor="username" className="form-label">Username</label></h5>
                                    <div className="form-group">
                                        <div className="col-xs-6 col-xs-offset-3">
                                            <input type="text" required="required" onChange={(e) => {setUser(e.target.value)}} className="form-control  text-center align-center" id="username" aria-describedby="usernameHelp" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-xs-6 col-xs-offset-3">
                                            <button type="submit" onClick={handleLogin} className="btn mt-2 btn-primary">Login</button>
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                            <div className="card-footer discordColor3-t text-center">
                                Discord clone
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;