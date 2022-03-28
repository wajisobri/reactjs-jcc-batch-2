import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = (props) => {
    const [mobileAppList, setMobileAppList] = useState([])
    const [inputMobileApp, setInputMobileApp] = useState(
        {
            id: "", name: "", description: "", category: "", release_year: 2007, size: 0, price: 0,
            rating: 0, image_url: "", is_android_app: true, is_ios_app: true
        }
    )
    const [currentId, setCurrentId] = useState(-1)
    const [actionMessage, setActionMessage] = useState({ type: "", title:"", message: "" })
    const [search, setSearch] = useState("")
    const [inputSearch, setInputSearch] = useState("")

    return (
        <AppContext.Provider value={{ 
                mobileAppList, setMobileAppList,
                inputMobileApp, setInputMobileApp,
                currentId, setCurrentId,
                actionMessage, setActionMessage,
                search, setSearch,
                inputSearch, setInputSearch
            }}>
            {props.children}
        </AppContext.Provider>
    )
}