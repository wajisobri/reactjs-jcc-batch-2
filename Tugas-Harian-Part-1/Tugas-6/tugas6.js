// soal 1
var nilaiJohn = 80;
var nilaiDoe = 50;

console.log("Nilai John:");
if(nilaiJohn >= 80) {
    console.log('A');
} else if(nilaiJohn >= 70 && nilaiJohn < 80) {
    console.log('B');
} else if(nilaiJohn >= 60 && nilaiJohn < 70) {
    console.log('C');
} else if(nilaiJohn >= 50 && nilaiJohn < 60) {
    console.log('D');
} else {
    console.log('E');
}

console.log("Nilai Doe:");
if(nilaiDoe >= 80) {
    console.log('A');
} else if(nilaiDoe >= 70 && nilaiDoe < 80) {
    console.log('B');
} else if(nilaiDoe >= 60 && nilaiDoe < 70) {
    console.log('C');
} else if(nilaiDoe >= 50 && nilaiDoe < 60) {
    console.log('D');
} else {
    console.log('E');
}


// soal 2
console.log("--------------------------");
var tanggal = 2;
var bulan = 10;
var tahun = 2001;

switch(bulan) {
    case 1: console.log(`${tanggal} Januari ${tahun}`); break;
    case 2: console.log(`${tanggal} Februari ${tahun}`); break;
    case 3: console.log(`${tanggal} Maret ${tahun}`); break;
    case 4: console.log(`${tanggal} April ${tahun}`); break;
    case 5: console.log(`${tanggal} Mei ${tahun}`); break;
    case 6: console.log(`${tanggal} Juni ${tahun}`); break;
    case 7: console.log(`${tanggal} Juli ${tahun}`); break;
    case 8: console.log(`${tanggal} Agustus ${tahun}`); break;
    case 9: console.log(`${tanggal} September ${tahun}`); break;
    case 10: console.log(`${tanggal} Oktober ${tahun}`); break;
    case 11: console.log(`${tanggal} November ${tahun}`); break;
    case 12: console.log(`${tanggal} Desember ${tahun}`); break;
}


// soal 3
console.log("--------------------------");
console.log("LOOPING PERTAMA");
var i = 2;
while(i <= 20) {
    console.log(`${i} - I love coding`);
    i += 2;
}
console.log("LOOPING KEDUA");
for(var i=20; i>=2; i-=2) {
    console.log(`${i} - I will become a frontend developer`);
}


// soal 4
console.log("--------------------------");
for(var i=1; i<=20; i++) {
    if(i % 3 == 0 && i % 2 == 1) {
        console.log(`${i} - I Love coding`);
    } else if(i % 2 == 0) {
        console.log(`${i} - Berkualitas`);
    } else {
        console.log(`${i} - Santai`);
    }
}

// soal 5
console.log("--------------------------");
for(var i=1; i<=7; i++) {
    var toPrint = "";
    for(var j=1; j<=i; j++) {
        toPrint += "#";
    }
    console.log(toPrint);
}