import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LandingLayout } from "../../components/landing/LandingLayout";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie"

export const Login = () => {
  let history = useHistory()
  const { inputLogin, setInputLogin } = useContext(AuthContext)
  const { setIsLogin, setActionMessage } = useContext(AppContext)

  const afterLogin = (dest) => {
    history.push(dest)
    setInputLogin({
      email: "",
      password: "",
    });
  };
  
  const formValidation = () =>
    inputLogin.email !== "" && inputLogin.password !== ""

  const handleSubmit = (event) => {
    event.preventDefault()
    const { email, password } = inputLogin
  
    if (formValidation()) {
      axios
        .post(`https://dev-example.sanbercloud.com/api/login`, {
          email,
          password,
        })
        .then((res) => {
          let {token, user} = res.data
          Cookies.set("token", token);
          Cookies.set("user", JSON.stringify(user));
          setActionMessage({type: "Green", title:"Success", message: "Berhasil Login"})
          setTimeout(() => {
            setActionMessage({type: "", title:"", message: ""})
          }, 3000)
          afterLogin("/dashboard")
          setIsLogin(true);
        })
        .catch((err) => {
          setActionMessage({type: "Red", title:"Error", message: "Gagal Login"})
          setTimeout(() => {
            setActionMessage({type: "", title:"", message: ""})
          }, 3000)
          console.log(err);
          afterLogin("/login")
        });
    } else {
      setActionMessage({type: "Red", title:"Error", message: "Harap perhatikan ketentuan isian"})
      setTimeout(() => {
        setActionMessage({type: "", title:"", message: ""})
      }, 3000)
      afterLogin("/login")
    }
  };
  
  const handleChange = (event) => {
    const value = event.target.value
    setInputLogin({
      ...inputLogin,
      [event.target.name]: value,
    })
  }    

  return (
    <>
      <LandingLayout>
        <div className="container mx-auto px-1 md:px-6 py-8 max-w-5xl">
          <div className="w-11/12 m-auto px-4 py-4 mt-6 bg-gray-100 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-2 relative">
                <label htmlFor="name-with-label" className="text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={inputLogin.email}
                  onChange={handleChange}
                  className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
              <div className="p-2 relative">
                <label htmlFor="name-with-label" className="text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={inputLogin.password}
                  onChange={handleChange}
                  className="mt-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  placeholder="Your password"
                />
              </div>
              <div className="p-2 relative">
                <button className="w-full py-3 px-6 bg-green-500 hover:bg-gray-800 hover:text-white focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-lg font-normal shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div>
            <Link to="/register">
              <button
                type="button"
                className="my-8 py-2 px-4 bg-gray-800 hover:bg-purple-600 focus:bg-purple-400 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-8"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </LandingLayout>
    </>
  );
};