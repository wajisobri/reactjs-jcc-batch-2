import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { formatPlatform, formatDescription } from '../lib/formatter'

export const MobileList = () => {
    let history = useHistory();
    const { mobileAppList, setMobileAppList } = useContext(AppContext)
    const { setInputMobileApp } = useContext(AppContext)
    const {setCurrentId} = useContext(AppContext)
    const {actionMessage, setActionMessage} = useContext(AppContext)

    const actionClass = actionMessage.type === "Green" ? "bg-green-200 border-green-600 text-green-600" : "bg-red-200 border-red-600 text-red-600"

    const handleAdd = () => {
        setCurrentId(-1)
        setInputMobileApp({
            id: "", name: "", description: "", category: "", release_year: 2007, size: 0, price: 0,
            rating: 0, image_url: "", is_android_app: true, is_ios_app: true
        })
        history.push("/mobile-form")
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://backendexample.sanbercloud.com/api/mobile-apps`)
            setMobileAppList(res.data.map(item => {
                return {
                    id: item.id, name: item.name, description: item.description, category: item.category,
                    size: item.size, price: item.price, rating: item.rating, image_url: item.image_url,
                    release_year: item.release_year, is_android_app: (item.is_android_app === 1 ? true : false),
                    is_ios_app: (item.is_ios_app === 1 ? true : false)
                }
            }))
        }

        fetchData()
    }, [setMobileAppList])
    
    const handleDelete = (event) => {
        const ID_MOBILE_APPS = parseInt(event.target.value)
        axios.delete(`https://backendexample.sanbercloud.com/api/mobile-apps/${ID_MOBILE_APPS}`)
        .then(() => {
            let newMobileAppList = mobileAppList.filter(item => item.id !== ID_MOBILE_APPS)
            setMobileAppList(newMobileAppList)
            setActionMessage({type: "Red", title:"Success", message: "Data has been deleted"})
            setTimeout(() => {
                setActionMessage({type: "", title:"", message: ""})
            }, 4000)
        })
    }

    const handleEdit = (event) => {
        const ID_MOBILE_APPS = parseInt(event.target.value)
        axios.get(`https://backendexample.sanbercloud.com/api/mobile-apps/${ID_MOBILE_APPS}`)
        .then(result => {
            let data = result.data
            setInputMobileApp({
                name: data.name, description: data.description, category: data.category,
                size: data.size, price: data.price, rating: data.rating, image_url: data.image_url,
                release_year: data.release_year, is_android_app: (data.is_android_app === 1 ? true : false),
                is_ios_app: (data.is_ios_app === 1 ? true : false)
            })
            setCurrentId(data.id)
            history.push("/mobile-form/edit/" + data.id)
        })
    }

    return (
        <>
        <div className="px-20 container w-full my-8">
            <button type="button" onClick={handleAdd} className="mx-20 w-full py-2 px-4 bg-gray-800 hover:bg-purple-600 focus:bg-purple-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-8">
                Create Data
            </button>
            <table className="table p-4 bg-white shadow rounded-lg w-full">
                <thead>
                    <tr className="text-gray-700 table-fixed text-left">    
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">NO</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">NAME</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">CATEGORY</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">DESCRIPTION</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">RELEASE YEAR</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">SIZE</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">RATING</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">PRICE</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">IMAGE URL</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">IS ANDROID</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">IS IOS</th>
                        <th className="border-b-2 py-3 px-4 font-normal text-gray-900 w-1/12">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mobileAppList.map((item, index) => {
                            return (
                                <tr key={item.id} className="text-gray-700">
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{index + 1}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{item.name}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{item.category}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{formatDescription(item.description)}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{item.release_year}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{item.size}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{item.rating}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{item.price}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-2/12">{formatDescription(item.image_url)}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{formatPlatform(item.is_android_app)}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">{formatPlatform(item.is_ios_app)}</td>
                                    <td className="border-b-2 p-4 text-gray-900 w-1/12">
                                        <button onClick={handleEdit} value={item.id} className="w-auto mb-2 py-3 px-6 bg-white hover:bg-gray-800 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-200 text-gray-900 w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Edit</button>
                                        <button onClick={handleDelete} value={item.id} className="w-auto py-3 px-6 bg-red-600 hover:bg-gray-800 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            
            <div className={`fixed bottom-10 left-5 w-1/6 ${actionClass} border-l-4 p-4 ${actionMessage.type === "" ? "hidden" : ""}`} role="alert">
                <p className="font-bold">
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
