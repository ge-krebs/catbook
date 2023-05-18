const express = require('express')
const hbs = require('express-handlebars')
const fs = require('node:fs/promises')
const fileUpload = require('express-fileupload')
const { parse } = require('node:path')

const server = express()

//get data from json file into variable
const data = __dirname + '/data/data.json'

// const routes = require('./routes.js')

//middleware
server.engine('hbs', hbs.engine({extname: 'hbs',}))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')
server.use(express.static(__dirname + '/public'))

//file upload
server.use(fileUpload())
server.use(express.urlencoded({ extended: false }))

// server.use('/cats', routes)

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
      return 'oh no an error :(' + res.status(500).send(err.message)
    })
})

//route for create profile page - to be moved
server.get('/createProfile', (req, res) => {
  return res.render('createProfile')
})

// create profile route - to be moved
server.post('/createProfile', (req, res) => {
  const { image } = req.files
  if (!image) return res.sendStatus(400)
// move image to public folder
image.mv(__dirname + '/public/' + image.name)
// read cat data.json file to find id
// create object for new cat
// append new object to existing data araray
fs.readFile(data, 'utf-8')
  .then(catData => {
    //parsedData == object of array from data.json
    const parsedData = JSON.parse(catData)
    const id = parsedData.cats.length + 1
    //create new object for stored data
    let newCat = {
      id: id,
      name: req.body.name,
      handle: req.body.handle,
      quote: req.body.quote,
      image: "/" + image.name
    }
    //add new cat to obj/arr
    parsedData.cats.push(newCat)
    fs.writeFile(data, JSON.stringify(parsedData))
    //redirect to cat profile
    res.redirect('/profiles/' + id)
  })
  .catch((err) => {
    return 'oh no an error :(' + res.status(500).send(err.message)
  })
})

//SEARCH FOR CAT
server.post('/profiles', (req, res) => {
  //converts returned name to lowercase
  const nameSearch = req.body.catSearch.toLowerCase()
  fs.readFile(data, 'utf-8')
  .then(catData => {
    const parsedData = JSON.parse(catData)
    //loops through cat array to find each cats name
    for(let i=0; i < parsedData.cats.length; i++) {
      //updates cats name to lowercase to match against search
      const catName = parsedData.cats[i].name.toLowerCase()
      const id = parsedData.cats[i].id
      //if search name = cats name redirect
      if(nameSearch == catName){
        res.redirect('/profiles/' + id)
      } else {
        //alert pop up not function not working
        //alert("No cat found!")
      }
    }
  })
  .catch((err) => {
    return 'oh no an error :(' + res.status(500).send(err.message)
  })

})
module.exports = server