import ServerChannel from "./ServerChannel";
import ServerChannel2 from "./ServerChannel2";
import ProfileBar from "../Friendlist/ProfileBar";

const ServerChannels = () => {
    return (
        <>
            <div className="row">
                <h5 className="fw-bold text-white">VueReact</h5>
                <div className="col-6 col-sm-6 col-md-12 col-lg-12">
                    <ServerChannel />
                    <ServerChannel2 />
                </div>
                <div className="col-6 col-sm-6 col-md-12 col-lg-12">
                    <ProfileBar />
                </div>
            </div>
        </>
    )
}

export default ServerChannels;