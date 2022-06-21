import {useAuth} from "./auth";
import {useNavigate} from "react-router-dom";
import {socket} from "./socket";


const ChannelTopBar = () => {

    // const auth = useAuth()
    // const navigate = useNavigate()
    // const handleLogout = () => {
    //     auth.logout()
    //     navigate('/')
    // }

    return (
        <div className="row border-bottom border-dark discordColor3-t">
            <div className="col align-items-center d-inline-flex text-white">
                <i className="fa-solid fa-xl fa-hashtag"></i>
                <span className="me-5 ms-2 fw-bold align-middle">
                    Channel React
                </span>

                {/*<div className="buttonWidth">*/}
                {/*    <button type="button" onClick={handleLogout} className="btn btn-danger">Logout</button>*/}
                {/*</div>*/}
            </div>
            <div className="col-auto align-self-center discordColor3-t">
                <i className="fa-solid mx-2 fa-xl fa-hashtag"></i>
                <i className="fa-solid mx-2 fa-xl fa-bell-slash"></i>
                <i className="fa-solid mx-2 fa-xl fa-thumbtack"></i>
                <i className="fa-solid mx-2 fa-xl fa-user-group"></i>
            </div>
            <div className="col-auto searchHeight">
                <input type="text" className="w-100 mt-3 form-h form-control discordColor1" placeholder="Search"/>
            </div>
            <div className="col-auto align-self-center discordColor3-t">
                <i className="fa-solid me-3 fa-xl fa-inbox"></i>
                <i className="fa-solid fa-xl fa-circle-question"></i>
            </div>
        </div>
    )
}

export default ChannelTopBar;