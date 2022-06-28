import React from "react";

const FriendsTopBar = () => {

    return (
        <div className="row discordColor3 border-bottom border-dark discordColor3-t">
            <div className="col align-items-center d-inline-flex text-white">
                <i className="fa-solid me-2 fa-lg fa-circle-user"></i>
                <span className="me-5 fw-bold align-middle">
                    Friends
                </span>
                <span className="align-middle fw-bold me-4">Online</span>
            </div>
        </div>
    )
}

export default FriendsTopBar;