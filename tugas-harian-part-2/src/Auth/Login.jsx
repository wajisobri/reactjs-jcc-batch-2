import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { AuthContext } from '../Context/AuthContext'
import Cookies from "js-cookie"
import { AppContext } from '../Context/AppContext'

export const Login = () => {
    let history = useHistory()
    const { inputAuth, setInputAuth } = useContext(AuthContext)
    const { setIsLogin } = useContext(AppContext)

    const afterLogin = (dest) => {
        history.push(dest)
        setInputAuth({
            name: "",
            email : "",
            password : ""
        })
    }

    const formValidation = () => (
        (inputAuth.email !== "" && inputAuth.password !== "")
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = inputAuth

        if(formValidation()) {
            axios.post(`https://backendexample.sanbersy.com/api/user-login`, {email, password})
            .then((res) => {
                let { token } = res.data
                Cookies.set('token', token)
                afterLogin("/")
                setIsLogin(true)
            })
            .catch((err) => {
                alert("Gagal Login")
                console.log(err)
                afterLogin("/login")
            })
        } else {
            afterLogin("/login")
        }
    }

    const handleChange = (event) => {
        const value = event.target.value
        setInputAuth({
            ...inputAuth,
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
                            Email
                        </label>
                        <input type="text" name="email" value={inputAuth.email} onChange={handleChange} className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Your email"/>
                    </div>
                    <div className="p-2 relative">
                        <label for="name-with-label" className="text-gray-700">
                            Password
                        </label>
                        <input type="password" name="password" value={inputAuth.password} onChange={handleChange} className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" placeholder="Your password"/>
                    </div>
                    <div className="p-2 relative">
                        <button className="w-full mr-2 py-3 px-6 bg-green-500 hover:bg-gray-800 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-lg font-normal shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <Link to="/register">
                    <button type="button" className="my-8 py-2 px-4 bg-gray-800 hover:bg-purple-600 focus:bg-purple-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-8">
                        Register
                    </button>
                </Link>
            </div>
        </div>
        </>
    )
}
