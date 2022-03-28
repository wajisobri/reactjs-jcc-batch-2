import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import { AppContext } from '../context/AppContext'

export const Navbar = () => {
    let history = useHistory()
    const { inputSearch, setInputSearch } = useContext(AppContext)

    const handleSearch = (event) => {
        setInputSearch(event.target.value)
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        history.push("/search/" + inputSearch)
        setInputSearch("")
    }

    return (
        <div className="topnav">
            <Link to="/">
                <img src={logo} width={100} alt="Logo JCC" />
            </Link>
            <Link to="/">Home</Link>
            <Link to="/mobile-list">Mobile App List</Link>
            <Link to="/about">About</Link>
            <form onSubmit={handleSearchSubmit}>
                <input type="text" name="search" value={inputSearch} onChange={handleSearch} className="mr-4 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-2/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Search app"/>
                <button type="submit" className="py-2 px-4 mr-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Search
                </button>
            </form>
        </div>
    )
}
