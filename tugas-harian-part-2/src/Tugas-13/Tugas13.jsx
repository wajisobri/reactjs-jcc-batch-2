import React from 'react';
import './tugas13.css'
import { Tugas13Provider } from './Tugas13Context';
import { Tugas13Form } from './Tugas13Form';
import { Tugas13List } from './Tugas13List';

const Tugas13 = () => {
    return (
        <Tugas13Provider>
            <h1>Daftar Nilai Mahasiswa</h1>
            <Tugas13List />
            
            <h1>Form Nilai Mahasiswa</h1>
            <Tugas13Form />
        </Tugas13Provider>
    )
}

export default Tugas13;