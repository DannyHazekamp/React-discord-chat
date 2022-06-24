import { useState, useContext, createContext} from 'react'
//import {socket} from "./socket";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
   // const [room, setRoom] = useState(null)

    const login = (user) => {
        setUser(user)
        sessionStorage.setItem('user', user)
    }

    const logout = () => {
        setUser(null)
        sessionStorage.removeItem('user')
    }

    return <AuthContext.Provider value={{ user, login, logout}}>
        {children}
    </AuthContext.Provider>


}

export const useAuth = () => {
    return useContext(AuthContext)
}