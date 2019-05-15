const fs = require('fs'); // useful for navigating the file system
const parse = require('csv-parse/lib/sync'); // needed for parsing CSV file data

function linkBuyerToFacility() {
  let existingHooli = []
  let samHooli = []
    // import and parse existing accounts
    let existingPromise = fs.promises.readFile('./existing-accounts.csv')
    .then(parse)
    .then(data => data.forEach(item => existingHooli.push(item[1].slice(0, -3))))
    .then((data) => existingHooli = existingHooli.sort())
    .catch(error => reject(error))
    // import and parse sam accounts
    const samPromise = fs.promises.readFile('sam-accounts.csv')
    .then(parse)
    .then(data => data.forEach(item => samHooli.push(item[0])))
    .then((data) => samHooli = samHooli.sort())
    .catch(error => reject(error))

  Promise.all([existingPromise, samPromise])
  .then(() => console.log(samHooli.length))
}

linkBuyerToFacility()

// 0011R00001zEpqn
// 0011R00001zCcZxQAK
