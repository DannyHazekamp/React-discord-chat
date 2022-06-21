import {useAuth} from "./auth";
import {Navigate} from "react-router-dom";

export const RequireAuth = ({ children }) => {
    const auth = useAuth()

    if(!sessionStorage.getItem('user')) {
       return  <Navigate to='/' />
    }

    return children
}


