import FriendIcon from "./FriendIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Friends = () => {
    return (
        <div>
            <div className="row mt-3">
                <div className="col-10">
                    <p className="discordColor3-t">Direct messages</p>
                </div>
                <div className="col-2">
                    <span className="discordColor3-t">
                        <i className="fa-solid fa-xl fa-plus"></i>
                    </span>
                </div>
            </div>
            <FriendIcon />
            <FriendIcon />
            <FriendIcon />
            <FriendIcon />
        </div>
    )
}

export default Friends;