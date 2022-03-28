import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { formatSize, formatPrice, formatPlatformToStr } from '../lib/formatter'

export const Home = () => {
    const { mobileAppList, setMobileAppList } = useContext(AppContext)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://backendexample.sanbercloud.com/api/mobile-apps`)
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

    return (
        <>
        <div className="w-11/12 bg-white p-12 mx-auto my-8">
            <div className="header mb-12">
                <div className="title">
                <p className="text-4xl font-bold text-gray-800">
                    Popular Mobile App
                </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-12">
                {
                    mobileAppList.map((item, index) => {
                        return (
                            <div key={item.id} className="overflow-hidden shadow-lg rounded-lg w-full md:w-full m-auto">
                                <img alt="Mobile App" src={item.image_url} className="h-80 w-full object-cover" />
                                <div className="bg-white w-full p-4">
                                    <p className="text-indigo-500 text-sm font-medium">
                                        Release Year: {item.release_year}
                                    </p>
                                    <p className="text-gray-800 text-2xl font-bold mb-2">
                                        {item.name}
                                    </p>
                                    <p className="text-gray-400 font-bold text-md">
                                        Price:
                                        <span className="inline font-light"> {formatPrice(item.price)}</span>
                                    </p>
                                    <p className="text-gray-400 font-bold text-md">
                                        Rating:
                                        <span className="inline font-light"> {item.rating}</span>
                                    </p>
                                    <p className="text-gray-400 font-bold text-md">
                                        Size:
                                        <span className="inline font-light"> {formatSize(item.size)}</span>
                                    </p>
                                    <p className="text-gray-400 font-bold text-md">
                                        Platform:
                                        <span className="inline font-light"> {formatPlatformToStr(item.is_android_app, item.is_ios_app)}</span>
                                    </p>
                                    <p className="text-gray-400 font-bold text-md">
                                        Description:
                                        <span className="inline font-light"> {item.description}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}
