import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Tugas13Context } from './Tugas13Context'

export const Tugas13List = (props) => {
    const {daftarNilai, setDaftarNilai} = useContext(Tugas13Context)
    const {setInputNilai} = useContext(Tugas13Context)
    const {setCurrentId} = useContext(Tugas13Context)

    const handleDelete = (event) => {
        const ID_STUDENT = parseInt(event.target.value)
        axios.delete(`http://backendexample.sanbercloud.com/api/student-scores/${ID_STUDENT}`)
        .then(() => {
            let newDaftarNilai = daftarNilai.filter(item => item.id !== ID_STUDENT)
            setDaftarNilai(newDaftarNilai)
        })
    }

    const handleEdit = (event) => {
        const ID_STUDENT = parseInt(event.target.value)
        axios.get(`http://backendexample.sanbercloud.com/api/student-scores/${ID_STUDENT}`)
        .then(result => {
            let data = result.data
            setInputNilai(data)
            setCurrentId(data.id)
        })
    }

    const getIndexScore = (score) => {
        if (score >= 80 && score <= 100) return 'A'
        else if (score >= 70) return 'B'
        else if (score >= 60) return 'C'
        else if (score >= 50) return 'D'
        else if (score >= 0) return 'E'
        else return '-'
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://backendexample.sanbercloud.com/api/student-scores')
            setDaftarNilai(res.data.map(item => {
                return {
                    id: item.id, name: item.name, course: item.course, score: item.score
                }
            }))
        }

        fetchData()
    }, [setDaftarNilai])

    return (
        <table className="table-daftar-nilai">
            <thead>
                <tr>    
                    <td>No</td>
                    <td>Nama</td>
                    <td>Mata Kuliah</td>
                    <td>Nilai</td>
                    <td>Indeks Nilai</td>
                    <td>Aksi</td>
                </tr>
            </thead>
            <tbody>
                {
                    daftarNilai.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.course}</td>
                                <td>{item.score}</td>
                                <td>{getIndexScore(item.score)}</td>
                                <td>
                                    <button onClick={handleEdit} value={item.id}>Edit</button>
                                    <button onClick={handleDelete} value={item.id}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}