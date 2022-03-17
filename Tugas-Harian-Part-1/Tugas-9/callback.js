function readBooks(time, book, callback ) {
    console.log("saya membaca " + book.name )
    setTimeout(function(){
        let sisaWaktu = 0
        if(time >= book.timeSpent) {
            sisaWaktu = time - book.timeSpent
            console.log("saya sudah membaca " + book.name + ", sisa waktu saya " + sisaWaktu)
            callback(sisaWaktu) //menjalankan function callback
        } else {
            console.log('waktu saya habis')
            callback(time)
        }   
    }, book.timeSpent)
}

var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000},
    {name: 'komik', timeSpent: 1000}
]

// using recursion
const readBook = (time, index) => {
    readBooks(time, books[index], (remaining) => {
        if(index+1 < 4 && remaining != 0) {
            readBook(remaining, index+1)
        }
    })
}

readBook(10000, 0)

// using callback hell
/* readBooks(10000, books[0], (time) => {
    readBooks(time, books[1], (time) => {
        readBooks(time, books[2], (time) => {
            readBooks(time, books[3], (time) => {
                
            })
        })
    })
}) */