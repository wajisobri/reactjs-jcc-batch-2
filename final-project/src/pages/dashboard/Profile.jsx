import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { DashboardContext } from '../../context/DashboardContext'

export const Profile = () => {
  const {profile} = useContext(DashboardContext)
  const {setNowPage} = useContext(DashboardContext)

  useEffect(() => {
    setNowPage("Profile")
  }, [setNowPage])

  return (
    <DashboardLayout>
      <div className="my-36 mx-auto shadow-lg rounded-2xl w-3/4 md:w-1/2 bg-white">
        <img alt="profil" src="https://www.tailwind-kit.com/images/landscape/1.jpg" className="rounded-t-lg h-44 w-full mb-4" />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <Link to="/dashboard" className="block relative">
            <img alt="profil" src={profile.image_url} className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white dark:border-gray-800" />
          </Link>
          <p className="text-gray-800 dark:text-white text-xl font-medium mt-2">
            {profile.name}
          </p>
          <p className="text-gray-400 text-xs mb-4">
            {profile.email}
          </p>
          <Link to="/change-password">
            <button className="shadow-lg text-xs p-2 bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-full">
              Change Password
            </button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
