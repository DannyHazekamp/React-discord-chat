import { useLocation } from "react-router-dom";

const ChannelTopBar = () => {

    return (
        <div className="row border-bottom border-dark discordColor3-t">
            <div className="col align-items-center d-inline-flex text-white">
                <i className="fa-solid fa-xl fa-hashtag"></i>
                {useLocation().pathname === "/server" ?
                    <span className="me-5 ms-2 fw-bold align-middle">
                        Channel React
                    </span>
                    :
                    <span className="me-5 ms-2 fw-bold align-middle">
                        Channel Vue
                    </span>
                }
            </div>
            <div className="col searchHeight">
                <input type="text" className="w-100 mt-3 form-h form-control discordColor1" placeholder="Search"/>
            </div>
        </div>
    )
}

export default ChannelTopBar;