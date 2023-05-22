const express = require('express')
const router = express.Router()
const fs = require('node:fs/promises')

const data = __dirname + '/data/data.json'

//Home page
router.get('/', (req, res) => {
  const template = 'home'
  res.render(template)
})

//all cat profiles route

router.get('/profiles', (req, res) => {
  fs.readFile(data, 'utf-8')
    .then((catData) => {
      return res.render('allProfiles', JSON.parse(catData))
    })
    .catch((err) => {
      return 'oh no an error :(' + res.status(500).send(err.message)
    })
})

//individual profiles route with id
router.get('/profiles/:id', (req, res) => {
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

//route for create profile page
router.get('/createProfile', (req, res) => {
  fs.readFile(data, 'utf-8')
    .then((catData) => {
      return res.render('createProfile', JSON.parse(catData))
    })
    .catch((err) => {
      return 'oh no an error :(' + res.status(500).send(err.message)
    })
})

//route/post details for profile creation
router.post('/createProfile', (req, res) => {
  const { image } = req.files
  if (!image) return res.sendStatus(400)
  // move image to public folder
  image.mv(__dirname + '/public/images/' + image.name)
  // read cat data.json file to find id
  // create object for new cat
  // append new object to existing data araray
  fs.readFile(data, 'utf-8').then((catData) => {
    //parsedData == object of array from data.json
    const parsedData = JSON.parse(catData)
    const id = parsedData.cats.length + 1
    //create new object for stored data
    let newCat = {
      id: id,
      name: req.body.name,
      handle: '@' + req.body.handle.toLowerCase(),
      quote: req.body.quote,
      image: '/images/' + image.name,
    }
    //add new cat to obj/arr
    parsedData.cats.push(newCat)
    fs.writeFile(data, JSON.stringify(parsedData))
    //redirect to cat profile
    res.redirect('/profiles/' + id)
  }).catch
})

//SEARCH FOR CAT
router.post('/profiles', (req, res) => {
  //converts returned name to lowercase
  const nameSearch = req.body.catSearch.toLowerCase()
  fs.readFile(data, 'utf-8')
    .then((catData) => {
      const parsedData = JSON.parse(catData)
      //loops through cat array to find each cats name
      for (let i = 0; i < parsedData.cats.length; i++) {
        //updates cats name to lowercase to match against search
        const catName = parsedData.cats[i].name.toLowerCase()
        const id = parsedData.cats[i].id
        //if search name = cats name redirect
        if (nameSearch == catName) {
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

module.exports = router
