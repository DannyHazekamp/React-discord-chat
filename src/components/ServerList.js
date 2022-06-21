import React from 'react';
import ServerIcon from './ServerIcon'
import HomeButton from "./HomeButton";
const ServerList = () => {
    return (
        <>
        <nav id="sidebarMenu" className="collapse discordColor1 d-lg-block sidebar collapse ">
            <div className="position-sticky h-100 discordColor1">
                <div className="list-group discordColor1 list-group-flush mx-3 mt-4">
                        <HomeButton />
                        <ServerIcon/>
                </div>
            </div>
        </nav>
        </>
    )
}


export default ServerList;