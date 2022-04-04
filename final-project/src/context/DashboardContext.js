import React, { createContext, useState } from 'react'

export const DashboardContext = createContext()

export const DashboardProvider = (props) => {
  const [profile, setProfile] = useState({
    id: "", name: "", email: "", image_url: ""
  })
  const [nowPage, setNowPage] = useState("")
  const [inputForm, setInputForm] = useState({
    title: "", job_description: "", job_qualification: "",
    job_type: "", job_tenure: "", job_status: "",
    company_name: "", company_image_url: "", company_city: "",
    salary_min: "", salary_max: ""
  })
  const [currentId, setCurrentId] = useState(-1)

  return (
    <DashboardContext.Provider value={{ 
      profile, setProfile,
      nowPage, setNowPage,
      inputForm, setInputForm,
      currentId, setCurrentId
      }}>
      {props.children}
    </DashboardContext.Provider>
  )
}
