import { createContext } from "react";
import { useAuth } from "../hooks/useauth";

const AuthContext = createContext(undefined);

function AuthProvider({children})
{
    const {register, login,logout, authenticated} = useAuth();

    return(
        <AuthContext.Provider value={{register, login, logout, authenticated}}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthProvider, AuthContext};