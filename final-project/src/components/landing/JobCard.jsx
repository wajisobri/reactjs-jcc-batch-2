import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { formatDescription, formatPrice } from '../../lib/formatter'

export const JobCard = () => {
  const {job} = useContext(AppContext)
  const {searchJob, filterJobType, filterJobStatus, filterCompanyCity, filterCompanyName} = useContext(AppContext)

  const jobList = () => {
    let arrayJob = job
    
    if(searchJob !== "") {
      arrayJob = arrayJob.filter(el => {
        return el.title.toLowerCase().includes(searchJob.toLowerCase())
      })
    }

    if(filterJobType !== "") {
      arrayJob = arrayJob.filter(el => {
        return el.job_type.toLowerCase().includes(filterJobType.toLowerCase())
      })
    }

    if(filterJobStatus !== "") {
      arrayJob = arrayJob.filter(el => {
        return el.job_status === parseInt(filterJobStatus)
      })
    }

    if(filterCompanyCity !== "") {
      arrayJob = arrayJob.filter(el => {
        return el.company_city.toLowerCase().includes(filterCompanyCity.toLowerCase())
      })
    }

    if(filterCompanyName !== "") {
      arrayJob = arrayJob.filter(el => {
        return el.company_name.toLowerCase().includes(filterCompanyName.toLowerCase())
      })
    }

    return arrayJob
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {
        jobList().map((item, index) => {
          return (
            <div className="overflow-hidden shadow-lg rounded-lg h-90 w-full cursor-pointer m-auto" key={index}>
              <Link to={`/job-vacancy/${item.id}`} className="w-full block h-full">
                <img alt="blog" src={item.company_image_url} className="h-40 w-full object-cover" />
              </Link>
              <div className="bg-white w-full p-4">
                <Link to={`/job-vacancy/${item.id}`} className="w-full block h-full">
                <p className="text-indigo-500 text-md font-medium">
                  {item.job_status === 1 ? "Lowongan Dibuka" : "Lowongan Ditutup"}
                </p>
                <p className="text-gray-800 text-xl font-medium mb-2">
                  {item.title}
                </p>
                <p className="text-gray-400 font-light text-md">
                  {formatDescription(item.job_description)}
                </p>
                <p className="text-gray-600 font-medium text-md">
                  Gaji: {formatPrice(item.salary_min)} - {formatPrice(item.salary_max)}
                </p>
                </Link>
                <div className="flex flex-wrap justify-starts items-center mt-4">
                  <div className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                    {item.job_tenure}
                  </div>
                  <div className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                    {item.job_type}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <Link to="/" className="block relative">
                    <img alt="profil" src={item.company_image_url} className="mx-auto object-cover rounded-full h-10 w-10 " />
                  </Link>
                  <div className="flex flex-col justify-between ml-4 text-sm">
                    <p className="text-gray-800">
                      {item.company_name}
                    </p>
                    <p className="text-gray-400">
                      {item.company_city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
