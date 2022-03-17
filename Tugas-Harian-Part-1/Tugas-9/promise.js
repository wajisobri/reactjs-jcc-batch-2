function readBooksPromise (time, book) {
    console.log("saya mulai membaca " + book.name )
        return new Promise( function (resolve, reject){
        setTimeout(function(){
            let sisaWaktu = time - book.timeSpent
            if(sisaWaktu >= 0 ){
                console.log("saya sudah selesai membaca " + book.name + ", sisa waktu saya " + sisaWaktu)
                resolve(sisaWaktu)
            } else {
                console.log("saya sudah tidak punya waktu untuk baca "+ book.name)
                reject(sisaWaktu)
            }
        }, book.timeSpent)
    })
}

var books = [
    {name: 'LOTR', timeSpent: 3000}, 
    {name: 'Fidas', timeSpent: 2000}, 
    {name: 'Kalkulus', timeSpent: 4000}
]

// using recursion
const readBook = (time, index) => {
    readBooksPromise(time, books[index])
    .then(remaining => {
        if(index+1 < 3 && remaining != 0) {
            readBook(remaining, index+1)
        }
    })
    .catch(err => {
        console.log(err.message)
    })
}

readBook(10000, 0)

// using chaining
/* readBooksPromise(10000, books[0])
.then(time => {
    readBooksPromise(time, books[1])
    .then(time => {
        readBooksPromise(time, books[2])
        .then(time => {})
        .catch(time => {})
    })
    .catch(time => {})
})
.catch(time => {}) */