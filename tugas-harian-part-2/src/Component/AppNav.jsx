import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/logo.png'
import { ThemeContext } from '../Context/ThemeContext'
import Cookies from "js-cookie"
import { useHistory } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

export const AppNav = () => {
    let history = useHistory()
    const { theme, setTheme } = useContext(ThemeContext)
    const { setIsLogin } = useContext(AppContext)

    const classTheme = (theme === "light") ? "bg-white" : "bg-gray-800"
    const fontTheme = (theme === "light") ? "text-gray-600 hover:text-black" : "text-gray-300 hover:text-white"

    return (
        <>
        <nav className={ classTheme + " shadow py-2" }>
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-16">
                    <div className=" flex items-center">
                    <Link className="flex-shrink-0" to="/">
                        <img className="h-10 w-30" src={logo} alt="Logo JCC" />
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
                        {
                        !Cookies.get('token') &&
                        <>
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} to="/login">
                            Login
                        </Link>
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} to="/register">
                            Register
                        </Link>
                        </>
                        }
                        {
                        Cookies.get('token') &&
                        <Link className={`${fontTheme} px-3 py-2 rounded-md text-md font-medium`} onClick={() => {
                            Cookies.remove('token')
                            history.push('/login')
                            setIsLogin(false)
                        }}>
                            Logout
                        </Link>
                        }
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
        </nav>
        </>
    )
}
