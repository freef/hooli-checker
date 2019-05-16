const fs = require('fs') // useful for navigating the file system
const parse = require('csv-parse/lib/sync') // needed for parsing CSV file data

function linkBuyerToFacility() {
  let existingHooli = []
  let samHooli = []
  let diff = []

    // import and parse existing accounts. Data is stored as an array
    let existingPromise = fs.promises.readFile('./existing-accounts.csv')
    .then(data => parse(data, {from: 1}))
    .then(data => data.forEach(item => existingHooli.push(item[1].length !== 15 ?
      item[1].slice(0, -3) :
      item[1])
    ))
    .catch(error => reject(error))

    // import and parse sam accounts. Data is stored as an array
    const samPromise = fs.promises.readFile('sam-accounts.csv')
    .then(data => parse(data, {from: 1}))
    .then(data => data.forEach(item => samHooli.push(item[0])))
    .catch(error => reject(error))

// use a Promise.all block to compare arrays once data has been parsed
  Promise.all([existingPromise, samPromise])
  .then(() => samHooli.filter(x => !existingHooli.includes(x)))
  .then((data) => {
    data.unshift('HooliId')
    return data
  })
  .then(data => data.join('\r\n'))
  .then(data => fs.writeFile('difference-summary.csv', data, (err) => {
    if (err) throw err
    console.log('Report generated in the file "difference-summary.csv"')
  }))
  .catch(error => reject(error))
}
linkBuyerToFacility()
