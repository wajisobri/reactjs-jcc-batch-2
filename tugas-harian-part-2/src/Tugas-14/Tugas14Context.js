import React, { createContext, useState } from 'react'

export const Tugas14Context = createContext()

export const Tugas14Provider = (props) => {
    const [daftarNilai, setDaftarNilai] = useState([])
    const [inputNilai, setInputNilai] = useState({ id: "", name: "", course: "", score: 0 })
    const [currentId, setCurrentId] = useState(-1)
    const [actionMessage, setActionMessage] = useState({ type: "", title:"", message: "" })

    return (
        <Tugas14Context.Provider value={{ 
                daftarNilai, setDaftarNilai,
                inputNilai, setInputNilai,
                currentId, setCurrentId,
                actionMessage, setActionMessage
            }}>
            {props.children}
        </Tugas14Context.Provider>
    )
}