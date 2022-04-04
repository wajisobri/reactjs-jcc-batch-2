import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'

export const LandingFilter = () => {
  const {setFilterJobType, setFilterJobStatus, setFilterCompanyCity, setFilterCompanyName} = useContext(AppContext)
  const [inputFilter, setInputFilter] = useState({
    job_type: "", job_status:"", company_city: "", company_name: ""
  })

  const handleFilter = (event) => {
    event.preventDefault()
    const {job_type, job_status, company_city, company_name} = inputFilter

    setFilterJobType(job_type)
    setFilterJobStatus(job_status)
    setFilterCompanyCity(company_city)
    setFilterCompanyName(company_name)
  }

  const handleResetFilter = () => {
    setInputFilter({
      job_type: "", job_status:"", company_city: "", company_name: ""
    })
    setFilterJobType("")
    setFilterJobStatus("")
    setFilterCompanyCity("")
    setFilterCompanyName("")
  }

  const handleChange = (event) => {
    const value = event.target.value
    setInputFilter({
      ...inputFilter,
      [event.target.name]: value,
    })
  }

  return (
    <form onSubmit={handleFilter} className="mb-20 flex flex-col md:flex-row w-full max-w-5xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
      <div className="relative">
        <input
          type="text"
          name="job_type"
          value={inputFilter.job_type}
          onChange={handleChange}
          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Job Type"
        />
      </div>
      <div className="relative">
      <select
        name="job_status"
        defaultValue={inputFilter.job_status === "" ? "" : inputFilter.job_status}
        onChange={handleChange}
        className="block w-full md:w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-primary-500">
        <option value="">
            Job Status
        </option>
        <option value="1">
            Buka
        </option>
        <option value="0">
            Tutup
        </option>
    </select>
      </div>
      <div className="relative">
        <input
          type="text"
          name="company_city"
          value={inputFilter.company_city}
          onChange={handleChange}
          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Company City"
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="company_name"
          value={inputFilter.company_name}
          onChange={handleChange}
          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Company Name"
        />
      </div>
      <button
        className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        type="submit"
      >
        Filter
      </button>
      <button
        className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        type="button"
        onClick={handleResetFilter}
      >
        Reset Filter
      </button>
    </form>
  )
}
