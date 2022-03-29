import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = (props) => {
    const [daftarNilai, setDaftarNilai] = useState([])
    const [inputNilai, setInputNilai] = useState({ id: "", name: "", course: "", score: 0 })
    const [currentId, setCurrentId] = useState(-1)
    const [actionMessage, setActionMessage] = useState({ type: "", title:"", message: "" })
    const [isLogin, setIsLogin] = useState(false)

    return (
        <AppContext.Provider value={{ 
                daftarNilai, setDaftarNilai,
                inputNilai, setInputNilai,
                currentId, setCurrentId,
                actionMessage, setActionMessage,
                isLogin, setIsLogin
            }}>
            {props.children}
        </AppContext.Provider>
    )
}
