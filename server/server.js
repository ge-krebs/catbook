const express = require('express')
//file upload
const fileUpload = require('express-fileupload')
//hbs express
const hbs = require('express-handlebars')
//promises
const fs = require('node:fs/promises')

const server = express()

//get data from json file into variable
const data = __dirname + '/data/data.json'

module.exports = server

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

server.use(express.urlencoded({ extended: false }))

//file upload
server.use(fileUpload())

server.get('/compliment', (req, res) => {
  res.send('<h1>you look <em>nice</em> today</h1>')
})

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
      console.log(parsedData)
      const cat = parsedData.cats.find((cat) => cat.id == id)
      return res.render('profiles', cat)
    })
    .catch((err) => {
      return res.status(500).send(err.message)
    })
})

//create profile route - to be moved


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
