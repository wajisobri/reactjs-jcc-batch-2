import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home } from '../pages/Home'
import { MobileList } from '../pages/MobileList'
import { MobileForm } from '../pages/MobileForm'
import { About } from '../pages/About'
import { AppProvider } from '../context/AppContext'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Search } from '../pages/Search'

export const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <AppProvider>
                    <Navbar />
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/mobile-list">
                        <MobileList />
                    </Route>
                    <Route exact path="/mobile-form">
                        <MobileForm />
                    </Route>
                    <Route exact path="/mobile-form/edit/:Id">
                        <MobileForm />
                    </Route>
                    <Route exact path="/search/:valueOfSearch">
                        <Search />
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Footer />
                </AppProvider>
            </Switch>
        </Router>
    )
}
