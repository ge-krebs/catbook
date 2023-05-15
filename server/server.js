const express = require('express')
//file upload
const fileUpload = require('express-fileupload');

const server = express()

module.exports = server

server.use(express.static('server/public'))

server.use(express.urlencoded({extended: false}))
//file upload
server.use(fileUpload())

server.get('/compliment', (req, res) => {
  res.send('<h1>you look <em>nice</em> today</h1>')
})

//get profile by search name
// http://localhost:3000/profile?name=silvia
server.get('/profile', (req, res) => {
  const name = req.query.name
  if(name == 'silvia') {
  res.sendFile(__dirname + '/silvia.html')
  } if(name == 'sampson') {
    res.sendFile(__dirname + '/sampson.html')
  }
})

//get profiles by ID
//http://localhost:3000/profiles/2
server.get('/profiles/:id', (req, res) => {
  const id = req.params.id
  if(id === '1') {
    res.sendFile(__dirname + '/silvia.html')
  } if(id === '2') {
    res.sendFile(__dirname + '/sampson.html')
  }
})

//get name search/homepage
//http://localhost:3000/getname
server.get('/getname', (req, res) => {
  res.sendFile(__dirname + '/public/get-name.html')
})

//post named compliment
server.post('/named-compliment', (req, res) => {
  res.send('<h1>' + req.body.name + ', you look beautiful today <3</h1>')
})

// https://pqina.nl/blog/upload-image-with-nodejs/
// upload images to public?
server.post('/upload', (req, res) => {
  const {image} = req.files;
  if(!image) return res.sendStatus(400)

  //move image to public folder
  image.mv(__dirname + '/public/' + image.name)
  res.sendFile(__dirname + '/public/get-name.html')
})