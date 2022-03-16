// soal 1
console.log("----SOAL 1----")
const luasPersegiPanjang = (panjang, lebar) => {
    return panjang * lebar
}

const kelilingPersegiPanjang = (panjang, lebar) => {
    return 2 * (panjang + lebar)
}

const volumeBalok = (panjang, lebar, tinggi) => {
    return panjang * lebar * tinggi
}
 
let panjang= 12
let lebar= 4
let tinggi = 8
 
let HasilluasPersegiPanjang = luasPersegiPanjang(panjang, lebar)
let HasilkelilingPersegiPanjang = kelilingPersegiPanjang(panjang, lebar)
let HasilvolumeBalok = volumeBalok(panjang, lebar, tinggi)

console.log(HasilluasPersegiPanjang ) 
console.log(HasilkelilingPersegiPanjang )
console.log(HasilvolumeBalok )


// soal 2
console.log("\n----SOAL 2----")
const introduce = (...params) => {
    return `${params[2].toLowerCase() == 'laki-laki' ? 'Pak' : 'Ibu'} ${params[0]} adalah seorang ${params[3]} yang berusia ${params[1]} tahun`
}

//kode di bawah ini jangan dirubah atau dihapus
const perkenalan = introduce("John", "30", "Laki-Laki", "penulis")
console.log(perkenalan) // Menampilkan "Pak John adalah seorang penulis yang berusia 30 tahun"


// soal 3
console.log("\n----SOAL 3----")
let arrayDaftarPeserta = ["John Doe", "laki-laki", "baca buku" , 1992]
let objDaftarPeserta = {}

objDaftarPeserta.nama = arrayDaftarPeserta[0]
objDaftarPeserta.jenisKelamin = arrayDaftarPeserta[1]
objDaftarPeserta.hobi = arrayDaftarPeserta[2]
objDaftarPeserta.tahunLahir = arrayDaftarPeserta[3]

console.log(objDaftarPeserta)


// soal 4
console.log("\n----SOAL 4----")
let arrayBuah = []
let object1 = {
    nama: "Nanas",
    warna: "Kuning",
    adaBijinya: false,
    harga: 9000
}
let object2 = {
    nama: "Jeruk",
    warna: "Oranye",
    adaBijinya: true,
    harga: 8000
}
let object3 = {
    nama: "Semangka",
    warna: "Hijau & Merah",
    adaBijinya: true,
    harga: 10000
}
let object4 = {
    nama: "Pisang",
    warna: "Kuning",
    adaBijinya: false,
    harga: 5000
}
arrayBuah.push(object1)
arrayBuah.push(object2)
arrayBuah.push(object3)
arrayBuah.push(object4)

var arrayBuahFilter = arrayBuah.filter((item) => {
    return item.adaBijinya != true
})

console.log(arrayBuahFilter)


// soal 5
console.log("\n----SOAL 5----")
let phone = {
    name: "Galaxy Note 20",
    brand: "Samsung",
    year: 2020,
    colors: ["Mystic Bronze", "Mystic White", "Mystic Black"]
}

const {name: phoneName, brand: phoneBrand, year, colors: [colorBronze, , colorBlack]} = phone

console.log(phoneBrand, phoneName, year, colorBlack, colorBronze)


// soal 6
console.log("\n----SOAL 6----")
let warna = ["biru", "merah", "kuning" , "hijau"]

let dataBukuTambahan= {
  penulis: "john doe",
  tahunTerbit: 2020 
}

let buku = {
  nama: "pemograman dasar",
  jumlahHalaman: 172,
  warnaSampul:["hitam"]
}

let newObj = {...buku, warnaSampul: [...buku.warnaSampul, ...warna], ...dataBukuTambahan}
console.log(newObj)


// soal 7
console.log("\n----SOAL 7----")
const tambahDataFilm = (nama, durasi, genre, tahun) => {
    dataFilm.push(filmObject = {
        nama,
        durasi,
        genre,
        tahun
    })
}

let dataFilm = []

tambahDataFilm("LOTR", "2 jam", "action", "1999")
tambahDataFilm("avenger", "2 jam", "action", "2019")
tambahDataFilm("spiderman", "2 jam", "action", "2004")
tambahDataFilm("juon", "2 jam", "horror", "2004")
console.log(dataFilm)