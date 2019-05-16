# Hooli Checker
## Description
This is an implementation of the Hooli Checker problem for Matt Freeland.
The `index.js` file will output a list of items in `sam-accounts.csv` that are not present in `existing-accounts.csv` to `difference-summary.csv`

**Please note: this solution uses the method `fs.promises.readFile` which was added to Node version 10.
you can check your version of node with the command `node -v`**

## Usage
### Requirments
- Node Version 10.0.0 and above
- NPM Version 5.5.1 and above
### Instructions
- Copy this folder to your local drive
- Using a command line interface navigate to the folder
- run `npm install` to install dependencies
- run `node index.js` to run the report

## Potential Improvements
- Improve input validation
- Allow file to take any two files specified from the terminal using the `process.argv` method
- Improve ability to detect Hooli Ids
- Current solution implements a synchrnous version of parse and store the full array of Hooli Ids to memory, which could cause scaleability issues with larger datasets
