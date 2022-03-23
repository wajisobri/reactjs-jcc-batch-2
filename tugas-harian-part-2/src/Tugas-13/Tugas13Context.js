import React, { createContext, useState } from 'react'

export const Tugas13Context = createContext()

export const Tugas13Provider = (props) => {
    const [daftarNilai, setDaftarNilai] = useState([])
    const [inputNilai, setInputNilai] = useState({ id: "", name: "", course: "", score: 0 })
    const [currentId, setCurrentId] = useState(-1)

    return (
        <Tugas13Context.Provider value={{ 
                daftarNilai, setDaftarNilai,
                inputNilai, setInputNilai,
                currentId, setCurrentId
            }}>
            {props.children}
        </Tugas13Context.Provider>
    )
}
