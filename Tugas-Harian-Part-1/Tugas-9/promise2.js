function filterBooksPromise(colorful, amountOfPage){
    return new Promise(function(resolve, reject){
        var books=[
            {name: "shinchan", totalPage: 50, isColorful: true},
            {name: "Kalkulus", totalPage: 250, isColorful: false},
            {name: "doraemon", totalPage: 40, isColorful: true},
            {name: "algoritma", totalPage: 250, isColorful: false},
        ]
        if (amountOfPage >= 40) {
            resolve(books.filter(x=> x.totalPage >= amountOfPage && x.isColorful == colorful));
        } else {
            var reason= new Error("Maaf buku di bawah 40 halaman tidak tersedia")
            reject(reason);
        }
    });
}

async function filterBooks(isColorful, totalPage) {
    try {
        const res = await filterBooksPromise(isColorful, totalPage)
        console.log(res)
    } catch(err) {
        console.log(err.message)
    }
}

filterBooks(true, 40)
filterBooks(false, 250)
filterBooks(true, 30)