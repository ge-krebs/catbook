const express = require('express')

const server = express()

module.exports = server

server.use(express.static('server/public'))

server.get('/compliment', (req, res) => {
  res.send('<h1>you look <em>nice</em> today</h1>')
})

server.get('/profile', (req, res) => {
  const name = req.query.name
  if(name == 'silvia') {
  res.sendFile(__dirname + '/silvia.html')
  } if(name == 'sampson') {
    res.sendFile(__dirname + '/sampson.html')
  }
})

server.get('/profiles/:id', (req, res) => {
  const id = req.params.id
  if(id === '1') {
    res.sendFile(__dirname + '/silvia.html')
  } if(id === '2') {
    res.sendFile(__dirname + '/sampson.html')
  }
})