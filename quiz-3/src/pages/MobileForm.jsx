import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

export const MobileForm = () => {
    let history = useHistory();
    const params = useParams()
    const { mobileAppList, setMobileAppList } = useContext(AppContext)
    const { inputMobileApp, setInputMobileApp } = useContext(AppContext)
    const { currentId, setCurrentId } = useContext(AppContext)
    const { setActionMessage } = useContext(AppContext)

    const afterSubmit = () => {
        setInputMobileApp({
            id: "", name: "", description: "", category: "", release_year: 2007, size: 0, price: 0,
            rating: 0, image_url: "", is_android_app: true, is_ios_app: true
        })
        history.push("/mobile-list")
        setTimeout(() => {
            setActionMessage({type: "", title:"", message: ""})
        }, 5000)
    }

    useEffect(() => {
        if(params.Id !== undefined) {
            axios.get(`https://backendexample.sanbercloud.com/api/mobile-apps/${params.Id}`)
            .then(result => {
                let data = result.data
                setInputMobileApp({
                    id: data.id, name: data.name, description: data.description, category: data.category,
                    size: parseInt(data.size), price: parseInt(data.price), rating: parseInt(data.rating), image_url: data.image_url,
                    release_year: parseInt(data.release_year), is_android_app: (data.is_android_app === 1 ? true : false),
                    is_ios_app: (data.is_ios_app === 1 ? true : false)
                })
                setCurrentId(data.id)
            })
        }
    }, [setInputMobileApp, params.Id, setCurrentId])

    const formValidation = () => {
        return (
            (inputMobileApp.name !== "" && inputMobileApp.category !== "" && inputMobileApp.description !== "")
            &&
            (parseInt(inputMobileApp.release_year) >= 2007 && parseInt(inputMobileApp.size) >= 0 && parseInt(inputMobileApp.price) >= 0 && parseInt(inputMobileApp.rating) >= 0)
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(formValidation()) {
            if(currentId === -1) {
                axios.post(`https://backendexample.sanbercloud.com/api/mobile-apps`, {
                    name: inputMobileApp.name, description: inputMobileApp.description, category: inputMobileApp.category,
                    size: parseInt(inputMobileApp.size), price: parseInt(inputMobileApp.price), rating: parseInt(inputMobileApp.rating), image_url: inputMobileApp.image_url,
                    release_year: parseInt(inputMobileApp.release_year), is_android_app: (inputMobileApp.is_android_app === true ? 1 : 0),
                    is_ios_app: (inputMobileApp.is_ios_app === true ? 1 : 0)
                })
                .then(res => {
                    let data = res.data
                    setMobileAppList([...mobileAppList, {
                        id: data.id, name: data.name, description: data.description, category: data.category,
                        size: data.size, price: data.price, rating: data.rating, image_url: data.image_url,
                        release_year: data.release_year, is_android_app: (data.is_android_app === 1 ? true : false),
                        is_ios_app: (data.is_ios_app === 1 ? true : false)
                    }])
                    setCurrentId(-1)
                    setActionMessage({type: "Green", title:"Success", message: "Data has been created"})
                    afterSubmit()
                })
            } else {
                axios.put(`https://backendexample.sanbercloud.com/api/mobile-apps/${currentId}`, {
                    name: inputMobileApp.name, description: inputMobileApp.description, category: inputMobileApp.category,
                    size: parseInt(inputMobileApp.size), price: parseInt(inputMobileApp.price), rating: parseInt(inputMobileApp.rating), image_url: inputMobileApp.image_url,
                    release_year: parseInt(inputMobileApp.release_year), is_android_app: (inputMobileApp.is_android_app === true ? 1 : 0),
                    is_ios_app: (inputMobileApp.is_ios_app === true ? 1 : 0)
                })
                .then(() => {
                    setCurrentId(-1)
                    setActionMessage({type: "Green", title:"Success", message: "Data has been updated"})
                    afterSubmit()
                })
            }
        } else {
            setActionMessage({type: "Red", title:"Error", message: "input does not meet requirement"})
            setCurrentId(-1)
            afterSubmit()
        }
    }

    const handleChange = (event) => {
        const value = event.target.value
        setInputMobileApp({
            ...inputMobileApp,
            [event.target.name]: value
        })
    }

    const handleCheckbox = (event) => {
        setInputMobileApp({
            ...inputMobileApp,
            [event.target.name]: !inputMobileApp[event.target.name]
        })
    }

    return (
        <div className="container mx-auto px-6 py-8 sm:px-10 max-w-5xl">
            <div className="w-11/12 m-auto px-4 py-4 mt-6 bg-gray-100 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Name
                        </label>
                        <input type="text" name="name" required value={inputMobileApp.name} onChange={handleChange} className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="App name here"/>
                    </div>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Category
                        </label>
                        <input type="text" name="category" required value={inputMobileApp.category} onChange={handleChange} className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Category here"/>
                    </div>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Description
                        </label>
                        <textarea name="description" required value={inputMobileApp.description} onChange={handleChange} className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Description here"/>
                    </div>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Year
                        </label>
                        <input type="number" name="release_year" required value={inputMobileApp.release_year} onChange={handleChange} min="2007" max="2021" className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Release year here" />
                    </div>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Size
                        </label>
                        <input type="number" name="size" required value={inputMobileApp.size} onChange={handleChange} min="0" className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Size here" />
                    </div>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Price
                        </label>
                        <input type="number" name="price" required value={inputMobileApp.price} onChange={handleChange} min="0" className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Price here" />
                    </div>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Rating
                        </label>
                        <input type="number" name="rating" required value={inputMobileApp.rating} onChange={handleChange} min="0" max="5" className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Rating here" />
                    </div>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Image Url
                        </label>
                        <input type="text" name="image_url" required value={inputMobileApp.image_url} onChange={handleChange} className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Image Url here" />
                    </div>
                    <div className="p-2 relative">
                        <label htmlFor="name-with-label" className="text-gray-700">
                            Platform
                        </label>
                        <label className="flex items-center space-x-3 mb-3">
                            <input type="checkbox" name="is_android_app" onChange={handleCheckbox} className="form-tick bg-white h-6 w-6 border border-gray-300 rounded-md focus:outline-none cursor-pointer" checked={inputMobileApp.is_android_app === true ? true : false}/>
                            <span className="text-gray-700 font-normal">
                                Android
                            </span>
                        </label>
                        <label className="flex items-center space-x-3 mb-3">
                            <input type="checkbox" name="is_ios_app" onChange={handleCheckbox} className="form-tick bg-white h-6 w-6 border border-gray-300 rounded-md focus:outline-none cursor-pointer" checked={inputMobileApp.is_ios_app === true ? true : false}/>
                            <span className="text-gray-700 font-normal">
                                IOS
                            </span>
                        </label>
                    </div>
                    <div className="p-2 relative">
                        <button className="w-full mr-2 py-3 px-6 bg-green-500 hover:bg-gray-800 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-lg font-normal shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <Link to="/mobile-list">
                    <button type="button" className="my-8 py-2 px-4 bg-gray-800 hover:bg-purple-600 focus:bg-purple-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-8">
                        Back to Mobile App List
                    </button>
                </Link>
            </div>
        </div>
    )
}
