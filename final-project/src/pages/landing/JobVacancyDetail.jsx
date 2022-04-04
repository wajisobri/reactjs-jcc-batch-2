import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { LandingLayout } from '../../components/landing/LandingLayout'
import { formatPrice } from '../../lib/formatter'

export const JobVacancyDetail = () => {
  const params = useParams()
  const [jobDetail, setJobDetail] = useState({})

  const listQualification = () => {
    const str = "" + jobDetail.job_qualification
    let arr = []
    if(str.includes("\n")) {
      arr = jobDetail.job_qualification.split("\n")
    } else {
      arr.push(str)
    }
    return arr
  }
  
  useEffect(() => {
    const ID_JOB = params.id
    const fetchData = async () => {
      const res = await axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${ID_JOB}`)
      const item = res.data
      setJobDetail({
        id: item.id, title: item.title, job_description: item.job_description, job_qualification: item.job_qualification,
        job_type: item.job_type, job_tenure: item.job_tenure, job_status: item.job_status,
        company_name: item.company_name, company_image_url: item.company_image_url, company_city: item.company_city,
        salary_min: item.salary_min, salary_max: item.salary_max
      })
    }

    fetchData()
  })

  return (
    <>
    <LandingLayout>
      <div className="mx-2 md:mx-4 bg-white overflow-hidden relative lg:flex lg:items-center">
        <div className="w-3/4">
          <div>
            <img src={jobDetail.company_image_url} className="rounded-lg mb-8" alt={jobDetail.company_name} />
          </div>
        </div>
        <div className="w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <p className="text-indigo-500 text-md font-medium">
            {jobDetail.job_status === 1 ? "Lowongan Dibuka" : "Lowongan Ditutup"}
          </p>
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            <span className="block">
              {jobDetail.title}
            </span>
          </h2>
          <p className="text-md mt-4 text-gray-400">
            {jobDetail.job_description}
          </p>
          <p className="text-lg mt-4 font-bold text-gray-400">
            Kualifikasi:
          </p>
          <ol className="list-decimal list-inside md:list-outside text-gray-400">
            {
              listQualification().map((item) => {
                return <li className="text-md">{item}</li>
              })
            }
          </ol>
          <p className="text-md font-medium mt-4 text-gray-800">
            Gaji: {formatPrice(jobDetail.salary_min)} - {formatPrice(jobDetail.salary_max)}
          </p>
          <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-6 inline-flex rounded-md">
              <button className="mr-2 py-2 px-4 bg-green-500 text-white w-full text-center text-base font-semibold shadow-md rounded-lg">
                {jobDetail.job_tenure}
              </button>
            </div>
            <div className="mt-6 inline-flex rounded-md">
              <button className="mr-2 py-2 px-4 bg-green-500 text-white w-full text-center text-base font-semibold shadow-md rounded-lg">
                {jobDetail.job_type}
              </button>
            </div>
          </div>
          <div className="flex items-center mt-8">
            <Link to="/" className="block relative">
              <img alt="profil" src={jobDetail.company_image_url} className="mx-auto object-cover rounded-full h-10 w-10 " />
            </Link>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800">
                {jobDetail.company_name}
              </p>
              <p className="text-gray-400">
                {jobDetail.company_city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
    </>
  )
}
