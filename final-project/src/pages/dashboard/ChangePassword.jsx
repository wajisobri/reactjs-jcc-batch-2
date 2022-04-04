import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import Cookies from "js-cookie"
import { DashboardContext } from "../../context/DashboardContext";
import { AppContext } from "../../context/AppContext";

export const ChangePassword = () => {
  let history = useHistory()
  const [inputPassword, setInputPassword] = useState({
    current_password: "", new_password: "", confirm_new_password: ""
  })
  const {setNowPage} = useContext(DashboardContext)
  const {setActionMessage} = useContext(AppContext)

  useEffect(() => {
    setNowPage("ChangePassword")
  }, [setNowPage])

  const afterSubmit = (dest) => {
    history.push(dest)
    setInputPassword({
      current_password: "", new_password: "", confirm_new_password: ""
    });
  };

  const formValidation = () =>
    (inputPassword.current_password && inputPassword.new_password !== "" && inputPassword.confirm_new_password !== "")
    && (inputPassword.new_password === inputPassword.confirm_new_password)

  const handleSubmit = (event) => {
    event.preventDefault()
    const { current_password, new_password, confirm_new_password } = inputPassword
  
    if (formValidation()) {
      axios
        .post(`https://dev-example.sanbercloud.com/api/change-password`, {
          current_password,
          new_password,
          confirm_new_password
        }, {
          headers: {"Authorization" : "Bearer "+ Cookies.get('token')}
        })
        .then(() => {
          setActionMessage({type: "Green", title:"Success", message: "Berhasil Memperbarui Password"})
					setTimeout(() => {
						setActionMessage({type: "", title:"", message: ""})
					}, 3000)
          afterSubmit("/dashboard")
        })
        .catch((err) => {
          setActionMessage({type: "Red", title:"Error", message: "Gagal Memperbarui Password"})
					setTimeout(() => {
						setActionMessage({type: "", title:"", message: ""})
					}, 3000)
          console.log(err);
          afterSubmit("/change-password")
        });
    } else {
      setActionMessage({type: "Red", title:"Error", message: "Harap penuhi ketentuan form validation"})
      setTimeout(() => {
        setActionMessage({type: "", title:"", message: ""})
      }, 3000)
      afterSubmit("/change-password")
    }
  };

  const handleChange = (event) => {
    const value = event.target.value
    setInputPassword({
      ...inputPassword,
      [event.target.name]: value,
    })
  }

	return (
		<DashboardLayout>
			<div className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden my-16">
				<div className="px-4 py-8 sm:px-10">
          <form onSubmit={handleSubmit}>
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm leading-5">
                <span className="px-2 text-gray-500 bg-white">
                  Change Password
                </span>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full space-y-6">
                <div className="w-full">
                  <div className=" relative ">
                    <input
                      type="password"
                      name="current_password"
                      value={inputPassword.current_password}
                      onChange={handleChange}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent required"
                      placeholder="Current Password"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className=" relative ">
                    <input
                      type="password"
                      name="new_password"
                      value={inputPassword.new_password}
                      onChange={handleChange}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent required"
                      placeholder="New Password"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className=" relative ">
                    <input
                      type="password"
                      name="confirm_new_password"
                      value={inputPassword.confirm_new_password}
                      onChange={handleChange}
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent required"
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>
                <div>
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                    >
                      Change Password
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </form>
				</div>
				<div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
					<p className="text-xs leading-5 text-gray-500">
            Make sure to fill in the password correctly
					</p>
				</div>
			</div>
		</DashboardLayout>
	);
};
