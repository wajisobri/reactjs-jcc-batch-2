import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './tugas12.css'

const Tugas12 = () => {
    const [daftarNilai, setDaftarNilai] = useState([])
    const [inputNilai, setInputNilai] = useState({ id: "", name: "", course: "", score: 0 })
    const [currentId, setCurrentId] = useState(-1)

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
    }, [])

    const formValidation = () => (
        (inputNilai.name !== "" && inputNilai.course !== "") && (parseInt(inputNilai.score) >= 0 && parseInt(inputNilai.score) <= 100)
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        if(formValidation()) {
            if(currentId === -1) {
                axios.post(`http://backendexample.sanbercloud.com/api/student-scores`, {name: inputNilai.name, course: inputNilai.course, score: parseInt(inputNilai.score)})
                .then(res => {
                    let data = res.data
                    setDaftarNilai([...daftarNilai, {id: data.id, name: data.name, course: data.course, score: data.score}])
                })
                setCurrentId(-1)
            } else {
                axios.put(`http://backendexample.sanbercloud.com/api/student-scores/${currentId}`, {name: inputNilai.name, course: inputNilai.course, score: parseInt(inputNilai.score)})
                .then(() => {
                    let mhs = daftarNilai.find(item => item.id === currentId)
                    mhs.name = inputNilai.name;
                    mhs.course = inputNilai.course;
                    mhs.score = parseInt(inputNilai.score);
                    setDaftarNilai([...daftarNilai])
                })
                setCurrentId(-1)
            }
        } else {
            alert("Input tidak memenuhi ketentuan")
            setCurrentId(-1)
        }
        setInputNilai({id: "", name: "", course: "", score: 0})
    }

    const handleChange = (event) => {
        const value = event.target.value
        setInputNilai({
            ...inputNilai,
            [event.target.name]: value
        })
    }

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

    return (
        <>
        <h1>Daftar Nilai Mahasiswa</h1>
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
        
        <h1>Form Nilai Mahasiswa</h1>
        <div className="input-form">
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Nama:</label></td>
                            <td><input type="text" name="name" value={inputNilai.name} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td><label>Mata Kuliah:</label></td>
                            <td><input type="text" name="course" value={inputNilai.course} onChange={handleChange}></input></td>
                        </tr>
                        <tr>
                            <td><label><label>Nilai:</label></label></td>
                            <td><input type="number" name="score" value={inputNilai.score} onChange={handleChange} min="0" max="100"></input></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={2}><button>Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        </>
    )
}

export default Tugas12;