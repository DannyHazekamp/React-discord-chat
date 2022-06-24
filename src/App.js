import React from 'react';
import ServerList from './components/ServerList'
import Header from './components/Header'
import FriendList from "./components/FriendList";
import FriendsTopBar from "./components/FriendsTopBar";
import FriendOverview from "./components/FriendOverview";
import FriendStatus from "./components/FriendStatus";
import {Routes, Route, useNavigate} from "react-router-dom";
import DiscordServer from "./components/pages/DiscordServer";
import Home from "./components/Home";
import Login from "./components/Login";
import {AuthProvider, useAuth} from "./components/auth";
import { RequireAuth } from "./components/RequireAuth"
import DiscordServerTwo from "./components/pages/DiscordServerTwo";
import io from "socket.io-client";
import PrivateChat from "./components/pages/PrivateChat";
import {socket} from "./components/socket";
import {useEffect} from "react";


function App() {

    const auth = useAuth()
    const navigate = useNavigate()
    //const socket = io.connect("http://localhost:7000");
    useEffect(() => {
        socket.on('disconnected', () => {
            socket.emit('logoutUser', sessionStorage.getItem('user'))
            navigate('/')
        })
    })

  return (

      <AuthProvider>
        <div className="App">
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
                    <Route path="/server" element={<RequireAuth><DiscordServer /></RequireAuth>} />
                    <Route path="/serverchanneltwo" element={<RequireAuth><DiscordServerTwo /></RequireAuth>} />
                    <Route path="/privatechat" element={<RequireAuth><PrivateChat /></RequireAuth>} />
                </Routes>
            </div>
        </div>
      </AuthProvider>
  );
}

export default App;
