import React, { useContext, useEffect } from 'react'
import { DashboardContext } from '../../context/DashboardContext'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import Cookies from "js-cookie"
import { ActionMessage } from '../ActionMessage'

export const DashboardLayout = (props) => {
  const {setProfile} = useContext(DashboardContext)

  useEffect(() => {
    const user = JSON.parse(Cookies.get('user'))

    setProfile({
      id: user.id, name: user.name,
      email: user.email, image_url: user.image_url
    })
  }, [setProfile])

  return (
    <>
    <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-fit overflow-hidden relative">
      <div className="flex items-start justify-between">
        <Sidebar />
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <Navbar />
          {props.children}
        </div>
      </div>
    </main>
    <ActionMessage />
    <Footer />
		</>
  )
}
