const express = require('express')
const path = require('path')

//initialize express
const app = express()
const PORT  = process.env.PORT || 3000

// body parsing middleware
app.use(express.json())

// static middleware
app.use(express.static(path.join(__dirname, '../static')))

// api routes
app.use('/api', require('./api')) 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'))
  }) // Send index.html for any other requests

app.listen(PORT, ()=>{
    console.log("I'm running on", PORT)
})