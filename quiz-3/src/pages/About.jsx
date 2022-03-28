import React from 'react'
import { Link } from 'react-router-dom'

export const About = () => {
    return (
        <>
        <div className="about">
            <h1>Data Peserta JabarCodingCamp 2022 Reactjs</h1>
            <div className="content">
                <ol>
                    <li><b>Nama:</b> Sobri Waskito Aji</li>
                    <li><b>Email:</b> sobri.waskito.tif420@polban.ac.id</li>
                    <li><b>Sistem Operasi yang digunakan:</b> Windows 10</li>
                    <li><b>Akun Gitlab:</b> wajisobri</li>
                    <li><b>Akun Telegram:</b> wajisobri</li>
                </ol>
            </div>
            <button type="button">
                <Link to="/">Kembali Ke Home</Link>
            </button>
        </div>
        </>
    )
}
