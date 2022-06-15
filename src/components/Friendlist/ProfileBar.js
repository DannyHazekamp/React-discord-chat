import discordicon from "../img/discordicon.png";

const ProfileBar = () => {
    return (
        <div className="row align-items-end">
            <div className="col">
                <a href="#" className="text-decoration-none discordColor2  ripple" aria-current="true">
                    <img alt="serverIcon" className="friendIcon" src={discordicon} />
                    <span className="discordColor3-t">Profile</span>
                </a>
            </div>
            <div className="col discordColor3-t">
                <i className="fa-solid fa-xl fa-microphone"></i>
                <i className="fa-solid fa-xl fa-headphones"></i>
                <i className="fa-solid fa-xl fa-gear"></i>
            </div>
        </div>
    )
}

export default ProfileBar;