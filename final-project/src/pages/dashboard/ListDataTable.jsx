import React, { useContext, useEffect, useState } from 'react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { DashboardContext } from '../../context/DashboardContext'
import { Table, Modal, Button, Space } from 'antd'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from "js-cookie"
import { formatPrice } from '../../lib/formatter'

export const ListDataTable = () => {
  let history = useHistory()
  const {setNowPage} = useContext(DashboardContext)
  const {job, setJob} = useContext(AppContext)
  const [visible, setVisible] = useState(false)
  const [modalInfo, setModalInfo] = useState("")
  const {setInputForm} = useContext(DashboardContext)
  const {setCurrentId} = useContext(DashboardContext)
  const {setFilterJobType, setFilterJobStatus, setFilterCompanyCity, setFilterCompanyName} = useContext(AppContext)
  const {searchJob, filterJobType, filterJobStatus, filterCompanyCity, filterCompanyName} = useContext(AppContext)
  const [inputFilter, setInputFilter] = useState({
    job_type: "", job_status:"", company_city: "", company_name: ""
  })
  const {setSearchJob, setActionMessage} = useContext(AppContext)
  const [inputSearch, setInputSearch] = useState("")

  const handleDelete = (event) => {
    const ID_JOB = event
    axios.delete(`https://dev-example.sanbercloud.com/api/job-vacancy/${ID_JOB}`, {
      headers: {"Authorization" : "Bearer "+ Cookies.get('token')}
    })
    .then(() => {
      let newJob = job.filter(item => item.id !== ID_JOB)
      setJob(newJob)
      setActionMessage({type: "Green", title:"Success", message: "Berhasil Menghapus Job"})
      setTimeout(() => {
        setActionMessage({type: "", title:"", message: ""})
      }, 3000)
    })
    .catch(err => {
      setActionMessage({type: "Red", title:"Error", message: "Gagal Menghapus Job"})
      setTimeout(() => {
        setActionMessage({type: "", title:"", message: ""})
      }, 3000)
    })
  }

  const handleEdit = (event) => {
    const ID_JOB = event
    axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${ID_JOB}`)
    .then(result => {
      let data = result.data
      setInputForm({
        id: data.id, title: data.title, job_description: data.job_description, job_qualification: data.job_qualification,
        job_type: data.job_type, job_tenure: data.job_tenure, job_status: data.job_status,
        company_name: data.company_name, company_image_url: data.company_image_url, company_city: data.company_city,
        salary_min: data.salary_min, salary_max: data.salary_max
      })
      setCurrentId(data.id)
      history.push("/dashboard/list-job-vacancy/edit/"+data.id)
    })
  }

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

  const handleSearch = (event) => {
    event.preventDefault()
    setSearchJob(inputSearch)
    console.log(inputSearch)
  }

  const handleSearchChange = (event) => {
    const value = event.target.value
    setInputSearch(value)
  }

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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      sorter: (a, b) => a.company.length - b.company.length,
      responsive: ['sm'],
    },
    {
      title: 'City',
      dataIndex: 'city',
      sorter: (a, b) => a.city.length - b.city.length,
      responsive: ['md'],
    },
    {
      title: 'Job Type',
      dataIndex: 'job_type',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.job_type.length - b.job_type.length,
      responsive: ['md'],
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setVisible(true)
              setModalInfo({
                id: record.key,
                title: record.title,
                job_description: record.job_description,
                job_qualification: record.job_qualification,
                job_type: record.job_type,
                job_tenure: record.job_tenure,
                job_status: record.job_status,
                company_name: record.company_name,
                company_image_url: record.company_image_url,
                company_city: record.company_city,
                salary_min: record.salary_min,
                salary_max: record.salary_max
              })
            }}
            style={{ background: "#1890ff", borderColor: "white" }}>
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => handleEdit(record.key)}
            style={{ background: "#1890ff", borderColor: "white" }}>
            Edit
          </Button>
          <Button
            type="primary"
            onClick={() => handleDelete(record.key)}
            style={{ background: "#1890ff", borderColor: "white" }}>
            Delete
          </Button>
          <Modal
            centered
            title={modalInfo.title}
            visible={visible}
            footer={null}
            onCancel={() => setVisible(false)}
            width={1000}
          >
            <b>Job Description:</b>
            <p>{modalInfo.job_description}</p>
            <b>Job Qualification:</b>
            <p>{modalInfo.job_qualification}</p>
            <b>Job Type:</b>
            <p>{modalInfo.job_type}</p>
            <b>Job Tenure:</b>
            <p>{modalInfo.job_tenure}</p>
            <b>Job Status:</b>
            <p>{modalInfo.job_status === 1 ? "Buka" : "Tutup"} ({modalInfo.job_status})</p>
            <b>Company Name:</b>
            <p>{modalInfo.company_name}</p>
            <b>Company Image URL:</b>
            <p>{modalInfo.company_image_url}</p>
            <b>Company City:</b>
            <p>{modalInfo.company_city}</p>
            <b>Salary Min:</b>
            <p>{formatPrice(modalInfo.salary_min)}</p>
            <b>Salary Max:</b>
            <p>{formatPrice(modalInfo.salary_max)}</p>
          </Modal>
        </Space>
      ),
    },
  ];

  let data = []
  jobList().map((item) => 
    data.push({
      key: item.id,
      title: item.title,
      job_description: item.job_description,
      company: item.company_name,
      city: item.company_city,
      job_qualification: item.job_qualification,
      job_type: item.job_type,
      job_tenure: item.job_tenure,
      job_status: item.job_status,
      company_name: item.company_name,
      company_image_url: item.company_image_url,
      company_city: item.company_city,
      salary_min: item.salary_min,
      salary_max: item.salary_max
    })
  )
  
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  useEffect(() => {
    setNowPage("ListDataTable")
  }, [setNowPage])

  return (
    <DashboardLayout>
      <div className="w-full bg-white my-10 md:my-12 p-6 md:p-8 lg:p-12">
        <form onSubmit={handleSearch} className="my-5 flex flex-col mx-auto md:flex-row w-full max-w-2xl md:space-x-3 space-y-3 md:space-y-0 justify-center">
          <div className="relative w-full">
            <input
              type="text"
              name="search"
              value={inputSearch}
              onChange={handleSearchChange}
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Find job title"
            />
          </div>
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            type="submit"
          >
            Search
          </button>
        </form>
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
      </div>
      <section className="h-full w-full">
        <Table columns={columns} dataSource={data} onChange={onChange} />,
      </section>
    </DashboardLayout>
  )
}
