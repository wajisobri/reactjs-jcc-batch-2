import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export const ActionMessage = () => {
  const {actionMessage} = useContext(AppContext)
  const actionClass = actionMessage.type === "Green" ?
    "bg-green-200 border-green-600 text-green-600" : "bg-red-200 border-red-600 text-red-600"

  return (
    <div className={`fixed bottom-10 left-5 w-1/6 ${actionClass} border-l-4 p-4 ${actionMessage.type === "" ? "hidden" : ""}`} role="alert">
      <p className="font-bold">
          {actionMessage.title}
      </p>
      <p>
          {actionMessage.message}
      </p>
    </div>
  )
}
