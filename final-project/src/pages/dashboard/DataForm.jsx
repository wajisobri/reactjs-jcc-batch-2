import axios from "axios"
import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { DashboardLayout } from "../../components/dashboard/DashboardLayout"
import { DashboardContext } from "../../context/DashboardContext"
import Cookies from "js-cookie"
import { AppContext } from "../../context/AppContext"

export const DataForm = () => {
  let history = useHistory()
	const { setNowPage, currentId, setCurrentId } = useContext(DashboardContext)
  const { inputForm, setInputForm } = useContext(DashboardContext)
  const { job, setJob, setActionMessage } = useContext(AppContext)

	useEffect(() => {
		setNowPage("DataForm")
	}, [setNowPage])

  const afterLogin = (dest) => {
    history.push(dest)
    setInputForm({
      title: "", job_description: "", job_qualification: "",
      job_type: "", job_tenure: "", job_status: "",
      company_name: "", company_image_url: "", company_city: "",
      salary_min: "", salary_max: ""
    });
  };
  
  const formValidation = () =>
    inputForm.title !== "" && inputForm.job_description !== ""

  const handleSubmit = (event) => {
    event.preventDefault()
    const {
      title, job_description, job_qualification, job_type, job_tenure, job_status,
      company_name, company_image_url, company_city, salary_min, salary_max
    } = inputForm
  
    if (formValidation()) {
      if(currentId === -1) {
        axios
        .post(`https://dev-example.sanbercloud.com/api/job-vacancy`, {
          title, job_description, job_qualification, job_type, job_tenure, job_status,
          company_name, company_image_url, company_city, salary_min, salary_max
        }, {
          headers: {"Authorization" : "Bearer "+ Cookies.get('token')}
        })
        .then((res) => {
          let data = res.data
          setJob([
            ...job, {
              id: data.id, title: data.title, job_description: data.job_description, job_qualification: data.job_qualification,
              job_type: data.job_type, job_tenure: data.job_tenure, job_status: data.job_status,
              company_name: data.company_name, company_image_url: data.company_image_url, company_city: data.company_city,
              salary_min: data.salary_min, salary_max: data.salary_max
            }
          ])
					setActionMessage({type: "Green", title:"Success", message: "Berhasil Menambahkan Job"})
					setTimeout(() => {
						setActionMessage({type: "", title:"", message: ""})
					}, 3000)
          afterLogin("/dashboard/list-job-vacancy")
        })
        .catch((err) => {
          setActionMessage({type: "Red", title:"Error", message: "Gagal Menambahkan Job"})
					setTimeout(() => {
						setActionMessage({type: "", title:"", message: ""})
					}, 3000)
          console.log(err);
          afterLogin("/dashboard/list-job-vacancy/create")
        });
      } else {
				axios.put(`https://dev-example.sanbercloud.com/api/job-vacancy/${currentId}`, {
					title, job_description, job_qualification, job_type, job_tenure, job_status,
          company_name, company_image_url, company_city, salary_min, salary_max
				}, {
          headers: {"Authorization" : "Bearer "+ Cookies.get('token')}
        })
				.then((res) => {
					let data = res.data
					let arrJob = job
          let indexItem = job.findIndex(item => item.id === currentId)
					arrJob[indexItem] = {
						id: data.id, title: data.title, job_description: data.job_description, job_qualification: data.job_qualification,
						job_type: data.job_type, job_tenure: data.job_tenure, job_status: data.job_status,
						company_name: data.company_name, company_image_url: data.company_image_url, company_city: data.company_city,
						salary_min: data.salary_min, salary_max: data.salary_max
					}
					setJob(arrJob)
					setActionMessage({type: "Green", title:"Success", message: "Berhasil Memperbarui Job"})
					setTimeout(() => {
						setActionMessage({type: "", title:"", message: ""})
					}, 3000)
					setCurrentId(-1)
        	afterLogin("/dashboard/list-job-vacancy")
				})
				.catch(err => {
					setActionMessage({type: "Red", title:"Error", message: "Gagal Memperbarui Job"})
					setTimeout(() => {
						setActionMessage({type: "", title:"", message: ""})
					}, 3000)
				})
      }
    } else {
			setActionMessage({type: "Red", title:"Error", message: "Harap Mengikuti Ketentuan Form Validation"})
			setTimeout(() => {
				setActionMessage({type: "", title:"", message: ""})
			}, 3000)
			setCurrentId(-1)
      afterLogin("/dashboard/list-job-vacancy/create")
    }
  }

  const handleChange = (event) => {
    const value = event.target.value
    setInputForm({
      ...inputForm,
      [event.target.name]: value,
    })
  }

	return (
		<DashboardLayout>
			<section className="h-full bg-gray-100 bg-opacity-50 my-8">
				<form onSubmit={handleSubmit} className="container w-full mx-auto shadow-md">
					<div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
						<div className="max-w-sm mx-auto md:w-full md:mx-0">
							<div className="inline-flex items-center space-x-4">
								<h1 className="text-gray-600">Form {currentId === -1 ? "Create" : "Save"}</h1>
							</div>
						</div>
					</div>
					<div className="space-y-3 bg-white">
						<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
							<div className="mx-auto space-y-3 w-full">
								<div className=" relative ">
									<input
										type="text"
										name="title"
                    value={inputForm.title}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Job Title"
									/>
								</div>
								<div className=" relative ">
									<textarea
                    rows="3"
										name="job_description"
                    value={inputForm.job_description}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Job Description"
									/>
								</div>
                <div className=" relative ">
									<textarea
                    rows="3"
										name="job_qualification"
										value={inputForm.job_qualification}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Job Qualification"
									/>
								</div>
                <div className=" relative ">
									<input
										type="text"
										name="job_type"
                    value={inputForm.job_type}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Job Type"
									/>
								</div>
                <div className=" relative ">
									<input
										type="text"
										name="job_tenure"
                    value={inputForm.job_tenure}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Job Tenure"
									/>
								</div>
                <div className=" relative ">
									<select
										name="job_status"
                    defaultValue={inputForm.job_status}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
									>
                    <option value="">
                      Select an option
                    </option>
                    <option value="1">
                      Buka
                    </option>
                    <option value="0">
                      Tutup
                    </option>
                  </select>
								</div>
							</div>
						</div>
						<hr />
						<div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
							<div className="mx-auto space-y-3 w-full">
								<div className=" relative ">
									<input
										type="text"
										name="company_name"
                    value={inputForm.company_name}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Company Name"
									/>
								</div>
								<div className=" relative ">
									<input
										type="text"
										name="company_image_url"
                    value={inputForm.company_image_url}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Company Image URL"
									/>
								</div>
                <div className=" relative ">
									<input
										type="text"
										name="company_city"
                    value={inputForm.company_city}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Company City"
									/>
								</div>
							</div>
						</div>
						<hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
							<div className="mx-auto space-y-3 w-full">
								<div className=" relative ">
									<input
										type="number"
                    min="0"
										name="salary_min"
                    value={inputForm.salary_min}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Salary Min"
									/>
								</div>
								<div className=" relative ">
									<input
										type="number"
                    min="0"
										name="salary_max"
                    value={inputForm.salary_max}
                    onChange={handleChange}
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
										placeholder="Salary Max"
									/>
								</div>
							</div>
						</div>
						<hr />
						<div className="w-full px-4 ml-auto text-gray-500 md:w-1/3">
							<button
								type="submit"
								className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								{currentId === -1 ? "Create" : "Save"}
							</button>
						</div>
						<div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
							<button
								type="button"
								onClick={() => {
									setCurrentId(-1)
									setInputForm({
										title: "", job_description: "", job_qualification: "",
										job_type: "", job_tenure: "", job_status: "",
										company_name: "", company_image_url: "", company_city: "",
										salary_min: "", salary_max: ""
									})
									history.push('/dashboard/list-job-vacancy')
								}}
								className="py-2 px-4  bg-white hover:bg-blue-100 focus:ring-blue-500 focus:ring-offset-blue-200 text-blue-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								Cancel
							</button>
						</div>
					</div>
				</form>
			</section>
		</DashboardLayout>
	);
};
