import SearchFriends from "./Friendlist/SearchFriends";
import Options from "./Friendlist/Options";
import Friends from "./Friendlist/Friends";
import ProfileBar from "./Friendlist/ProfileBar";
const FriendList = () => {
    return (
        <>
        <div className="row">
           <SearchFriends></SearchFriends>
           <Options></Options>
           <Friends></Friends>
        </div>
            <div className="row">
            <ProfileBar></ProfileBar>
            </div>
            </>
    )
}

export default FriendList;