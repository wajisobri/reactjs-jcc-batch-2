import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [inputLogin, setInputLogin] = useState({
    email: "", password: ""
  })
  const [inputRegister, setInputRegister] = useState({
    name: "", image_url: "", email: "", password: ""
  })

  return (
    <AuthContext.Provider value={{ 
      inputLogin, setInputLogin,
      inputRegister, setInputRegister
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}
