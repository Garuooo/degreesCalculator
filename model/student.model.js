const fs = require('fs')
const path = require('path')
const dataPath = path.join(__dirname,"data.json")
const data = JSON.parse(fs.readFileSync(dataPath,"utf-8"))

module.exports = data;