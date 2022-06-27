import SearchFriends from "./Friendlist/SearchFriends";
import Options from "./Friendlist/Options";
import Friends from "./Friendlist/Friends";
import ProfileBar from "./Friendlist/ProfileBar";
const FriendList = () => {
    return (
        <>
        <div className="row">
            <div className="col-6 col-sm-6 col-md-12 col-lg-12">
               <SearchFriends></SearchFriends>
               <Options></Options>
               <Friends></Friends>
            </div>
                <div className="col-6 col-sm-6 col-md-12 col-lg-12">
                <ProfileBar></ProfileBar>
            </div>
        </div>
        </>
    )
}

export default FriendList;