import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
// import { Tugas14Context } from './Tugas14Context'

export const Tugas14Form = (props) => {
    const {daftarNilai, setDaftarNilai} = useContext(AppContext)
    const {inputNilai, setInputNilai} = useContext(AppContext)
    const {currentId, setCurrentId} = useContext(AppContext)

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

    return (
        <>
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
            <div className="form">
                <Link to="/tugas14"><button>Kembali ke Tabel</button></Link>
            </div>
        </div>
        </>
    )
}
