import React, { createContext, useState } from 'react'

export const Tugas15Context = createContext()

export const Tugas15Provider = (props) => {
    const [daftarNilai, setDaftarNilai] = useState([])
    const [inputNilai, setInputNilai] = useState({ id: "", name: "", course: "", score: 0 })
    const [currentId, setCurrentId] = useState(-1)

    return (
        <Tugas15Context.Provider value={{ 
                daftarNilai, setDaftarNilai,
                inputNilai, setInputNilai,
                currentId, setCurrentId
            }}>
            {props.children}
        </Tugas15Context.Provider>
    )
}