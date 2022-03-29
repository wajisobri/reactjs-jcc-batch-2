import React from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppNav } from '../Component/AppNav'
import { AppProvider } from '../Context/AppContext'
import { AuthProvider } from '../Context/AuthContext'
import { ThemeProvider } from '../Context/ThemeContext'
import { Tugas10 } from '../Tugas-10/Tugas10'
import Tugas11 from '../Tugas-11/Tugas11'
import Tugas12 from '../Tugas-12/Tugas12'
import Tugas13 from '../Tugas-13/Tugas13'
import { Tugas14Form } from '../Tugas-14/Tugas14Form'
import { Tugas14List } from '../Tugas-14/Tugas14List'
import { Tugas15Form } from '../Tugas-15/Tugas15Form'
import { Tugas15List } from '../Tugas-15/Tugas15List'
import { Login } from '../Auth/Login'
import { Register } from '../Auth/Register'

export const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <AppProvider>
                    <ThemeProvider>
                        <AppNav />
                        <AuthProvider>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/register">
                                <Register />
                            </Route>
                        </AuthProvider>
                        <Route exact path="/tugas10">
                            <Tugas10 />
                        </Route>
                        <Route exact path="/tugas11">
                            <Tugas11 />
                        </Route>
                        <Route exact path="/tugas12">
                            <Tugas12 />
                        </Route>
                        <Route exact path="/tugas13">
                            <Tugas13 />
                        </Route>
                        <Route exact path="/tugas14/add">
                            <Tugas14Form />
                        </Route>
                        <Route exact path="/tugas14/edit/:id">
                            <Tugas14Form />
                        </Route>
                        <Route exact path="/tugas14">
                            <Tugas14List />
                        </Route>
                        <Route exact path="/tugas15">
                            <Tugas15List />
                        </Route>
                        <Route exact path="/tugas15/add">
                            <Tugas15Form />
                        </Route>
                        <Route exact path="/tugas15/edit/:id">
                            <Tugas15Form />
                        </Route>
                        <Route exact path="/">
                            <Tugas15List />
                        </Route>
                    </ThemeProvider>
                </AppProvider>
            </Switch>
        </Router>
    )
}
