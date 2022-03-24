import React, { createContext, useState } from 'react'

export const Tugas14Context = createContext()

export const Tugas14Provider = (props) => {
    const [daftarNilai, setDaftarNilai] = useState([])
    const [inputNilai, setInputNilai] = useState({ id: "", name: "", course: "", score: 0 })
    const [currentId, setCurrentId] = useState(-1)

    return (
        <Tugas14Context.Provider value={{ 
                daftarNilai, setDaftarNilai,
                inputNilai, setInputNilai,
                currentId, setCurrentId
            }}>
            {props.children}
        </Tugas14Context.Provider>
    )
}