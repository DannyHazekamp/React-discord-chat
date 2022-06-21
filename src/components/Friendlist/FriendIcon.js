import discordicon from "../../img/discordicon.png";

const FriendIcon = () => {
    return (
        <div className="row">
            <a href="src/components/Friendlist/FriendIcon#" className="text-decoration-none discordColor2 py-2 ripple" aria-current="true">
                <img alt="serverIcon" className="friendIcon" src={discordicon} />
                <span className="discordColor3-t">Name</span>
            </a>
        </div>
    )
}

export default FriendIcon;