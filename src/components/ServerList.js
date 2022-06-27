import React from 'react';
import ServerIcon from './ServerIcon'
import HomeButton from "./HomeButton";
const ServerList = () => {
    return (
        <>
        <nav id="sidebarMenu" className="align-self-center align-self-sm-center align-self-md-start align-self-lg-start position-sticky d-sm-block d-md-block d-lg-block discordColor1 sidebar">
            <div className="position-sticky discordColor1">
                <div className="list-group text-center discordColor1">
                        <HomeButton />
                        <ServerIcon/>
                </div>
            </div>
        </nav>
        </>
    )
}


export default ServerList;