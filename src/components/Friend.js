import discordicon from "../img/discordicon.png";

const Friend = () => {
    return (
        <div className=" border-top border-secondary row align-content-center">
            <div className="col">
                <a href="src/components/Friendlist/FriendIcon#" className="text-decoration-none  ripple" aria-current="true">
                    <img alt="serverIcon" className="friendIcon" src={discordicon} />
                </a>
            </div>
            <div className="col">
                <span className="discordColor3-t">Name</span>
                <span>Status</span>
            </div>
            <div className="col discordColor3-t">
                <i className="fa-solid me-4 fa-xl fa-message"></i>
                <i className="fa-solid fa-xl fa-ellipsis-vertical"></i>
            </div>
        </div>
    )
}

export default Friend;