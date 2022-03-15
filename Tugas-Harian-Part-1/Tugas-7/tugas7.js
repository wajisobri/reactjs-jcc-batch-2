// soal 1
let dataPeserta = ["john", "laki-laki", "programmer", "30"];
const [name, gender, status, age] = dataPeserta;

let output = `Halo, nama saya ${name}. saya ${gender} berumur ${age} bekerja sebagai seorang ${status}`;
console.log(output);


console.log("----------------------------");
// soal 2
let array1 = ["selamat", "anda", "melakukan", "perulangan", "array", "dengan", "for"];
for(index in array1) {
    console.log(array1[index]);
}


console.log("----------------------------");
// soal 3
let array2 = [1, 2, 3, 4, 5, 6,7, 8, 9, 10];
for(index in array2) {
    if(array2[index] % 2 == 0) {
        console.log(array2[index]);
    }
}


console.log("----------------------------");
// soal 4
let kalimat= ["aku", "saya", "sangat", "sangat", "senang", "belajar", "javascript"];
kalimat.shift();
kalimat.splice(1, 1);
console.log(kalimat.join(" "));


console.log("----------------------------");
// soal 5
var sayuran=[];
sayuran.push("Kangkung");
sayuran.push("Bayam");
sayuran.push("Buncis");
sayuran.push("Kubis");
sayuran.push("Timun");
sayuran.push("Seledri");
sayuran.push("Tauge");

sayuran.sort();
for(index in sayuran) {
    console.log(`${parseInt(index)+1}. ${sayuran[index]}`);
}