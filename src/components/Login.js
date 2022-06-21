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
        auth.login(user)
        // socket.emit('setRoom', room
        socket.emit('setUsers', user)
        // setRoom('')
        navigate('/home', {replace: true})
    }

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text"  onChange={(e) => {setUser(e.target.value)}} className="form-control" id="username" aria-describedby="usernameHelp" />
            </div>
            <button type="submit" onClick={handleLogin} className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login;