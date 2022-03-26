import axios from 'axios'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Tugas14Context } from '../Tugas-14/Tugas14Context'

export const Tugas15Form = (props) => {
    let history = useHistory();
    const {daftarNilai, setDaftarNilai} = useContext(Tugas14Context)
    const {inputNilai, setInputNilai} = useContext(Tugas14Context)
    const {currentId, setCurrentId} = useContext(Tugas14Context)
    const {setActionMessage} = useContext(Tugas14Context)

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
                setActionMessage({type: "Green", title:"Success", message: "Data has been created"})
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
                setActionMessage({type: "Green", title:"Success", message: "Data has been updated"})
            }
        } else {
            setActionMessage({type: "Red", title:"Error", message: "input does not meet requirement"})
            setCurrentId(-1)
        }
        setInputNilai({id: "", name: "", course: "", score: 0})
        history.push("/tugas15")
        setTimeout(() => {
            setActionMessage({type: "", title:"", message: ""})
        }, 5000)
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
        <div className="container mx-auto px-6 py-8 sm:px-10 max-w-5xl">
            <div className="w-11/12 m-auto px-4 py-4 mt-6 bg-gray-100 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-2 relative">
                        <label for="name-with-label" className="text-gray-700">
                            Name
                        </label>
                        <input type="text" name="name" value={inputNilai.name} onChange={handleChange} className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Your name"/>
                    </div>
                    <div className="p-2 relative">
                        <label for="name-with-label" className="text-gray-700">
                            Course
                        </label>
                        <input type="text" name="course" value={inputNilai.course} onChange={handleChange} className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Your course name"/>
                    </div>
                    <div className="p-2 relative">
                        <label for="name-with-label" className="text-gray-700">
                            Score
                        </label>
                        <input type="number" name="score" value={inputNilai.score} onChange={handleChange} min="0" max="100" className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" />
                    </div>
                    <div className="p-2 relative">
                        <button className="w-full mr-2 py-3 px-6 bg-green-500 hover:bg-gray-800 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-lg font-normal shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <Link to="/tugas15">
                    <button type="button" className="my-8 py-2 px-4 bg-gray-800 hover:bg-purple-600 focus:bg-purple-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-8">
                        Back to Score List
                    </button>
                </Link>
            </div>
        </div>
        </>
    )
}
