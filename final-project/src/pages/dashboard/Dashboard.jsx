import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { DashboardContext } from '../../context/DashboardContext'
import Cookies from "js-cookie"

export const Dashboard = () => {
  const {setNowPage, setProfile} = useContext(DashboardContext)

  useEffect(() => {
    setNowPage("Dashboard")

    const user = JSON.parse(Cookies.get('user'))

    setProfile({
      id: user.id, name: user.name,
      email: user.email, image_url: user.image_url
    })
  }, [setNowPage, setProfile])

  return (
    <DashboardLayout>
      <div className="mx-auto my-8 flex items-center">
        <Link to="/dashboard/list-job-vacancy">
        <button type="button" className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
            List Data Table
        </button>
        </Link>
        <Link to="/dashboard/list-job-vacancy/create">
        <button type="button" className="w-full border text-base font-medium text-black bg-white hover:bg-gray-100 px-4 py-2">
            Data Form
        </button>
        </Link>
        <Link to="/profile">
        <button type="button" className="w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2">
            Profile
        </button>
        </Link>
      </div>
    </DashboardLayout>
  )
}
