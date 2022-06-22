import ServerChannel from "./ServerChannel";
import ServerChannel2 from "./ServerChannel2";
import ProfileBar from "./Friendlist/ProfileBar";

const ServerChannels = () => {
    return (
        <>
            <div className="row">
                <h5 className="fw-bold text-white">Server name</h5>
                <ServerChannel />
                <ServerChannel2 />
            </div>
            <div className="row min-vh-100">
                <ProfileBar />
            </div>
        </>
    )
}

export default ServerChannels;