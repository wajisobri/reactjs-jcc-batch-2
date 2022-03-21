import React, { useState } from 'react';
import './tugas11.css'

const Tugas11 = () => {
    const [daftarBuah, setDaftarBuah] = useState(
        [
            {nama: "Nanas", hargaTotal: 100000, beratTotal: 4000 },
            {nama: "Manggis", hargaTotal: 350000, beratTotal: 10000},
            {nama: "Nangka", hargaTotal: 90000, beratTotal: 2000},
            {nama: "Durian", hargaTotal: 400000, beratTotal: 5000},
            {nama: "Strawberry", hargaTotal: 120000, beratTotal: 6000}
        ]
    )
    const [inputBuah, setInputBuah] = useState( {nama: "", hargaTotal: "", beratTotal: 0} )
    const [currentIndex, setCurrentIndex] = useState(-1)

    const formValidation = () => (inputBuah.nama === "" || inputBuah.hargaTotal === "" || inputBuah.beratTotal < 2000) ? false : true

    const handleSubmit = (event) => {
        event.preventDefault()
        let newData = daftarBuah

        if(formValidation()) {
            if(currentIndex === -1) {
                newData = [...newData, inputBuah]
            } else {
                newData[currentIndex] = inputBuah
                setCurrentIndex(-1)
            }
            setDaftarBuah(newData)
            setInputBuah({nama: "", hargaTotal: "", beratTotal: 0})

        } else {
            alert("Input tidak memenuhi ketentuan")
            if (currentIndex !== -1) {
                let editItem = daftarBuah[currentIndex]
                setInputBuah(editItem)
            } else {
                setInputBuah({nama: "", hargaTotal: "", beratTotal: 0})
            }
        }
    }

    const handleChange = (event) => {
        const value = event.target.value
        setInputBuah({
            ...inputBuah,
            [event.target.name]: value
        })
    }

    const handleDelete = (event) => {
        const index = parseInt(event.target.value)
        let deletedItem = daftarBuah[index]
        let newData = daftarBuah.filter((e) => e !== deletedItem)

        setDaftarBuah(newData)
    }

    const handleEdit = (event) => {
        const index = parseInt(event.target.value)
        setCurrentIndex(index)

        let editItem = daftarBuah[index]
        setInputBuah(editItem)
    }

    return (
        <>
        <h1>Daftar Harga Buah</h1>
        <table className="table-daftar-buah">
            <thead>
                <tr>    
                    <td>No</td>
                    <td>Nama</td>
                    <td>Harga total</td>
                    <td>Berat total</td>
                    <td>Harga per kg</td>
                    <td>Aksi</td>
                </tr>
            </thead>
            <tbody>
                {
                    daftarBuah.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.nama}</td>
                                <td>{item.hargaTotal}</td>
                                <td>{item.beratTotal}</td>
                                <td>{parseInt(item.hargaTotal)/(parseInt(item.beratTotal)/1000)}</td>
                                <td>
                                    <button onClick={handleEdit} value={index}>Edit</button>
                                    <button onClick={handleDelete} value={index}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        
        <h1>Form Daftar Harga Buah</h1>
        <div className="input-form">
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td><label>Nama:</label></td>
                        <td><input type="text" name="nama" value={inputBuah.nama} onChange={handleChange}></input></td>
                    </tr>
                    <tr>
                        <td><label>Harga Total:</label></td>
                        <td><input type="text" name="hargaTotal" value={inputBuah.hargaTotal} onChange={handleChange}></input></td>
                    </tr>
                    <tr>
                        <td><label><label>Berat Total(dalam gram):</label></label></td>
                        <td><input type="text" name="beratTotal" value={inputBuah.beratTotal} onChange={handleChange}></input></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan={2}><button>Submit</button></td>
                    </tr>
                </table>
            </form>
        </div>
        </>
    )
}

export default Tugas11;