import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../Tugas-14/ThemeContext'
import logo from './logo.png'

export const Tugas15Nav = () => {
    const { theme, setTheme } = useContext(ThemeContext)

    const classTheme = (theme === "light") ? "bg-white" : "bg-gray-800"
    const fontTheme = (theme === "light") ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"
    console.log(theme)

    return (
        <>
        <nav className={ classTheme + " shadow py-2" }>
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <div className=" flex items-center">
                    <Link className="flex-shrink-0" to="/">
                        <img className="h-8 w-8" src={logo} alt="Logo JCC" />
                    </Link>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} to="/tugas10">
                            Tugas 10
                        </Link>
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} to="/tugas11">
                            Tugas 11
                        </Link>
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} to="/tugas12">
                            Tugas 12
                        </Link>
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} to="/tugas13">
                            Tugas 13
                        </Link>
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} to="/tugas14">
                            Tugas 14
                        </Link>
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} to="/tugas15">
                            Tugas 15
                        </Link>
                        </div>
                    </div>
                    </div>
                    <div className="block">
                    <div className="md:block -mr-2 flex">
                        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" onClick={() => {
                            if(theme === 'light')
                                setTheme('dark')
                            else
                                setTheme('light')
                        }}>
                            {(theme === "light") ? "Dark" : "Light"}
                        </button>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                    </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                    <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                        <svg width={20} height={20} fill="currentColor" className="h-8 w-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                        </path>
                        </svg>
                    </button>
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" to="/">
                    Home
                    </Link>
                    <Link className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" to="/">
                    Gallery
                    </Link>
                    <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" to="/">
                    Content
                    </Link>
                    <Link className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" to="/">
                    Contact
                    </Link>
                </div>
                <div className="p-2 flex">
                    <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                    <div className=" relative ">
                        <input type="text" id="&quot;form-subscribe-Search" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="components" />
                    </div>
                    <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                        Search
                    </button>
                    </form>
                </div>
            </div>
        </nav>
        </>
    )
}
