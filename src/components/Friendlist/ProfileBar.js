import discordicon from "../../img/discordicon.png";

const ProfileBar = () => {
    const user = sessionStorage.getItem('user')
    return (
        <div className="row  align-self-end">
            <div className="col align-self-center">
                <a href="src/components/Friendlist/ProfileBar#" className="text-decoration-none discordColor2  ripple" aria-current="true">
                    <img alt="serverIcon" className="friendIcon" src={discordicon} />
                    <span className="discordColor3-t">{user}</span>
                </a>
            </div>
            <div className="col align-self-center discordColor3-t">
                <i className="fa-solid fa-xl me-2 fa-microphone"></i>
                <i className="fa-solid fa-xl me-2 fa-headphones"></i>
                <i className="fa-solid fa-xl fa-gear"></i>
            </div>
        </div>
    )
}

export default ProfileBar;