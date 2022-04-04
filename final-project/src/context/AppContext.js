import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = (props) => {
  const [job, setJob] = useState([])
  const [isLogin, setIsLogin] = useState(false)
  const [actionMessage, setActionMessage] = useState({type: "", title:"", message: "" })
  const [searchJob, setSearchJob] = useState("")
  const [filterJobStatus, setFilterJobStatus] = useState("")
  const [filterJobType, setFilterJobType] = useState("")
  const [filterCompanyName, setFilterCompanyName] = useState("")
  const [filterCompanyCity, setFilterCompanyCity] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://dev-example.sanbercloud.com/api/job-vacancy')
      setJob(res.data.data.map(item => {
        return {
          id: item.id, title: item.title, job_description: item.job_description, job_qualification: item.job_qualification,
          job_type: item.job_type, job_tenure: item.job_tenure, job_status: item.job_status,
          company_name: item.company_name, company_image_url: item.company_image_url, company_city: item.company_city,
          salary_min: item.salary_min, salary_max: item.salary_max
        }
      }))
    }

    fetchData()
  }, [setJob])

  return (
    <AppContext.Provider value={{ 
      job, setJob,
      isLogin, setIsLogin,
      actionMessage, setActionMessage,
      searchJob, setSearchJob,
      filterJobType, setFilterJobType,
      filterJobStatus, setFilterJobStatus,
      filterCompanyName, setFilterCompanyName,
      filterCompanyCity, setFilterCompanyCity
      }}>
      {props.children}
    </AppContext.Provider>
  )
}