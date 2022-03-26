import React from 'react'
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Tugas14Provider } from './Tugas14Context';
import { Tugas14List } from './Tugas14List'
import { Tugas14Form } from './Tugas14Form'
// import { Tugas14Nav } from './Tugas14Nav'
import { Tugas10 } from '../Tugas-10/Tugas10'
import Tugas11 from '../Tugas-11/Tugas11'
import Tugas12 from '../Tugas-12/Tugas12'
import Tugas13 from '../Tugas-13/Tugas13'
import { ThemeProvider } from './ThemeContext';
import { Tugas15List } from '../Tugas-15/Tugas15List';
import { Tugas15Nav } from '../Tugas-15/Tugas15Nav';
import { Tugas15Form } from '../Tugas-15/Tugas15Form';

export const Tugas14Routes = () => {
    return (
        <Router>
            <ThemeProvider>
                <Tugas15Nav />
            </ThemeProvider>
            <Switch>
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
                <Tugas14Provider>
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
                </Tugas14Provider>
            </Switch>
        </Router>
    )
}
