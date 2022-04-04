import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import { AppProvider } from "../context/AppContext"
import { Login } from "../pages/auth/Login"
import { Register } from "../pages/auth/Register"
import { Home } from "../pages/landing/Home"
import { JobVacancy } from "../pages/landing/JobVacancy"
import { JobVacancyDetail } from "../pages/landing/JobVacancyDetail"
import { Dashboard } from "../pages/dashboard/Dashboard"
import Cookies from "js-cookie"
import { Redirect } from "react-router-dom"
import { Profile } from "../pages/dashboard/Profile"
import { ChangePassword } from "../pages/dashboard/ChangePassword"
import { DashboardProvider } from "../context/DashboardContext"
import { ListDataTable } from "../pages/dashboard/ListDataTable"
import { DataForm } from "../pages/dashboard/DataForm"
import { NotFound } from "../components/landing/NotFound"

export const AppRoutes = () => {
	const LoginRoute = ({...props}) => {
		if(Cookies.get('token') !== undefined) {
			return <Redirect to={'/dashboard'} />
		} else if(Cookies.get('token') === undefined) {
			return <Route {...props} />
		}
	}

	const DashboardRoute = ({...props}) => {
		if(Cookies.get('token') === undefined) {
			return <Redirect to={'/login'} />
		} else if(Cookies.get('token') !== undefined) {
			return <Route {...props} />
		}
	}

	return (
		<AppProvider>
			<AuthProvider>
				<DashboardProvider>
					<Router>
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/job-vacancy">
								<JobVacancy />
							</Route>
							<Route exact path="/job-vacancy/:id">
								<JobVacancyDetail />
							</Route>
							<LoginRoute exact path="/login">
								<Login />
							</LoginRoute>
							<LoginRoute exact path="/register">
								<Register />
							</LoginRoute>
							<DashboardRoute exact path="/dashboard">
								<Dashboard />
							</DashboardRoute>
							<DashboardRoute exact path="/dashboard/list-job-vacancy">
								<ListDataTable />
							</DashboardRoute>
							<DashboardRoute exact path="/dashboard/list-job-vacancy/create">
								<DataForm />
							</DashboardRoute>
							<DashboardRoute exact path="/dashboard/list-job-vacancy/edit/:id">
								<DataForm />
							</DashboardRoute>
							<DashboardRoute exact path="/profile">
								<Profile />
							</DashboardRoute>
							<DashboardRoute exact path="/change-password">
								<ChangePassword />
							</DashboardRoute>
							<Route>
								<NotFound />
							</Route>
						</Switch>
					</Router>
				</DashboardProvider>
			</AuthProvider>
		</AppProvider>
	);
};
