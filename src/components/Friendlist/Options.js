import React from "react";

const Options = () => {
    return (
        <div className="list-group">
            <button type="button" className="list-group-item discordColor3-t discordColor2">
                <i className="fa-solid me-2 fa-xl fa-circle-user"></i>
                Friends
            </button>
            <button type="button" className="list-group-item discordColor3-t discordColor2">
                <i className="fa-solid fa-xl me-2 fa-bag-shopping"></i>
                Library
            </button>
            <button type="button" className="list-group-item discordColor3-t discordColor2">
                <i className="fa-solid fa-xl me-2 fa-bolt"></i>
                Nitro
            </button>
        </div>
    )
}

export default Options;