import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [inputAuth, setInputAuth] = useState({
        name: "",
        email : "",
        password : ""
    })

    return (
        <AuthContext.Provider value={{ 
            inputAuth, setInputAuth
        }}>
        {props.children}
        </AuthContext.Provider>
    )
}
