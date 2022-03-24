import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from './ThemeContext'

export const Tugas14Nav = () => {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <>
        <nav className={(theme === "light") ? "light-mode" : "dark-mode"}>
            <ul>
                <li>
                    <Link to="/tugas10">Tugas 10</Link>
                </li>
                <li>
                    <Link to="/tugas11">Tugas 11</Link>
                </li>
                <li>
                    <Link to="/tugas12">Tugas 12</Link>
                </li>
                <li>
                    <Link to="/tugas13">Tugas 13</Link>
                </li>
                <li>
                    <Link to="/">Tugas 14</Link>
                </li>
            </ul>
        </nav>
        <div className="switch">
            <button type="button" onClick={() => {
                if(theme === 'light')
                    setTheme('dark')
                else
                    setTheme('light')
            }}>Change Theme</button>
        </div>
        </>
    )
}
