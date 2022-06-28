import {Navigate} from "react-router-dom";

export const RequireAuth = ({ children }) => {

    if(!sessionStorage.getItem('user')) {
       return  <Navigate to='/' />
    }

    return children
}


