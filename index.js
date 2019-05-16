const fs = require('fs') // useful for navigating the file system
const parse = require('csv-parse/lib/sync') // needed for parsing CSV file data

function linkBuyerToFacility() {
  let existingHooli = []
  let samHooli = []
    // import and parse existing accounts
  const existingPromise = fs.promises.readFile('./existing-accounts.csv')
    .then(data => parse(data, {from: 1}))
    .then(data => data.forEach(item => existingHooli.push(item[1].slice(0, -3))))
    .catch(error => reject(error))
    // import and parse sam accounts
  const samPromise = fs.promises.readFile('sam-accounts.csv')
    .then(data => parse(data, {from: 1}))
    .then(data => data.forEach(item => samHooli.push(item[0])))
    .catch(error => reject(error))

  Promise.all([existingPromise, samPromise])
    .then(() => samHooli.filter(x => !existingHooli.includes(x)))
    .then(data => data.unshift('HooliId'))
    .then(data => data.join('\r\n'))
    .then(data => fs.writeFile('difference-summary.csv', data, (err) => {
      if (err) throw err
      console.log('Report generated in file difference-summary.csv')
      }))
  .catch(err => reject(error))
}
linkBuyerToFacility()
