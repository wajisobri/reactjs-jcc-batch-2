import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
// import { Tugas14Context } from '../Tugas-14/Tugas14Context'

export const Tugas15List = (props) => {
    let history = useHistory();
    const {daftarNilai, setDaftarNilai} = useContext(AppContext)
    const {setInputNilai} = useContext(AppContext)
    const {setCurrentId} = useContext(AppContext)
    const {actionMessage, setActionMessage} = useContext(AppContext)

    const actionClass = actionMessage.type === "Green" ? "bg-green-200 border-green-600 text-green-600" : "bg-red-200 border-red-600 text-red-600"

    const handleAdd = () => {
        setInputNilai({id: "", name: "", course: "", score: 0})
        history.push("/tugas15/add")
    }

    const handleDelete = (event) => {
        const ID_STUDENT = parseInt(event.target.value)
        axios.delete(`http://backendexample.sanbercloud.com/api/student-scores/${ID_STUDENT}`)
        .then(() => {
            let newDaftarNilai = daftarNilai.filter(item => item.id !== ID_STUDENT)
            setDaftarNilai(newDaftarNilai)
            setActionMessage({type: "Red", title:"Success", message: "Data has been deleted"})
            setTimeout(() => {
                setActionMessage({type: "", title:"", message: ""})
            }, 5000)
        })
    }

    const handleEdit = (event) => {
        const ID_STUDENT = parseInt(event.target.value)
        axios.get(`http://backendexample.sanbercloud.com/api/student-scores/${ID_STUDENT}`)
        .then(result => {
            let data = result.data
            setInputNilai(data)
            setCurrentId(data.id)
            history.push("/tugas15/edit/" + data.id)
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
        <>
        <div className="container mx-auto px-6 sm:px-10 max-w-5xl">
            <button type="button" onClick={handleAdd} className="my-8 py-2 px-4 bg-gray-800 hover:bg-purple-600 focus:bg-purple-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-8">
                Create Data
            </button>
            <table className="table p-4 bg-white shadow rounded-lg w-11/12 m-auto">
                <thead>
                    <tr class="text-gray-700 table-fixed text-left">    
                        <th className="border-b-2 py-3 px-6 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900 w-1/12">NO</th>
                        <th className="border-b-2 py-3 px-6 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900 w-1/12">NAME</th>
                        <th className="border-b-2 py-3 px-6 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900 w-1/12">COURSE</th>
                        <th className="border-b-2 py-3 px-6 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900 w-1/12">SCORE</th>
                        <th className="border-b-2 py-3 px-6 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900 w-1/12">INDEX SCORE</th>
                        <th className="border-b-2 py-3 px-6 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900 w-3/12">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        daftarNilai.map((item, index) => {
                            return (
                                <tr key={item.id} className="text-gray-700">
                                    <td className="border-b-2 p-6 dark:border-dark-5">{index + 1}</td>
                                    <td className="border-b-2 p-6 dark:border-dark-5">{item.name}</td>
                                    <td className="border-b-2 p-6 dark:border-dark-5">{item.course}</td>
                                    <td className="border-b-2 p-6 dark:border-dark-5">{item.score}</td>
                                    <td className="border-b-2 p-6 dark:border-dark-5">{getIndexScore(item.score)}</td>
                                    <td className="border-b-2 p-6 dark:border-dark-5">
                                        <button onClick={handleEdit} value={item.id} className="w-auto mr-2 py-3 px-6 bg-white hover:bg-gray-800 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-200 text-gray-900 w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Edit</button>
                                        <button onClick={handleDelete} value={item.id} className="w-auto py-3 px-6 bg-red-600 hover:bg-gray-800 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            
            <div class={`fixed bottom-10 left-5 w-1/6 ${actionClass} border-l-4 p-4 ${actionMessage.type === "" ? "hidden" : ""}`} role="alert">
                <p class="font-bold">
                    {actionMessage.title}
                </p>
                <p>
                    {actionMessage.message}
                </p>
            </div>
        </div>
        </>
    )
}