const express = require('express')
//hbs express
const hbs = require('express-handlebars')
//promises
const fs = require('node:fs/promises')
//file upload
const fileUpload = require('express-fileupload')

const server = express()

//get data from json file into variable
const data = __dirname + '/data/data.json'
console.log(data)

//middleware
server.engine(
  'hbs',
  hbs.engine({
    extname: 'hbs',
  })
)
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')
server.use(express.static(__dirname + '/public'))
//file upload
server.use(fileUpload())
server.use(express.urlencoded({ extended: false }))

// R O U T E S //

//main page//
server.get('/', (req, res) => {
  const template = 'home'
  res.render(template)
})

//profiles route
server.get('/profiles/:id', (req, res) => {
  const id = req.params.id
  fs.readFile(data, 'utf-8')
    .then((catData) => {
      const parsedData = JSON.parse(catData)
      const cat = parsedData.cats.find((cat) => cat.id == id)
      return res.render('profiles', cat)
    })
    .catch((err) => {
      return res.status(500).send(err.message)
    })
})

//route for create profile page - to be moved
server.get('/createProfile', (req, res) => {
  return res.render('createProfile')
})

//create profile route - to be moved
// server.post('/createProfile', (req, res) => {
//   const { image } = req.files
//   if (!image) return res.sendStatus(400)
// move image to public folder
// image.mv(__dirname + '/public/' + image.name)
// console.log(image.name)
// read cat data.json file to find id
// create object for new cat
// append new object to existing data araray
// fs.readFile(data, 'utf-8')
//   .then(catData => {

//   })
// })

//get profile by search name
// http://localhost:3000/profile?name=silvia
server.get('/profile', (req, res) => {
  const name = req.query.name
  res.sendFile(__dirname + '/' + name + '.html')
})

//get profiles by ID
//http://localhost:3000/profiles/2
server.get('/profiles/:id', (req, res) => {
  const id = req.params.id
  if (id === '1') {
    res.sendFile(__dirname + '/silvia.html')
  }
  if (id === '2') {
    res.sendFile(__dirname + '/sampson.html')
  }
})

//get name search/homepage
//http://localhost:3000/getname
server.get('/getname', (req, res) => {
  res.sendFile(__dirname + '/public/get-name.html')
})

// https://pqina.nl/blog/upload-image-with-nodejs/
// upload images to public?
//will eventually be the add cat profile page
//takes form data and adds to json data object as new array item
server.post('/upload', (req, res) => {
  const { image } = req.files
  if (!image) return res.sendStatus(400)

  //move image to public folder
  image.mv(__dirname + '/public/' + image.name)
  res.sendFile(__dirname + '/public/get-name.html')
})

module.exports = server
