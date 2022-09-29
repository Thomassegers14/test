const express = require('express')
const app = express()

const config = require('../../config.json')

app.use(`/${config.directory}`, express.static('test'))
app.get('/', (req, res) => {
  res.redirect(`/${config.directory}`)
})

app.listen(3333, () => console.log('Internal server running'))
