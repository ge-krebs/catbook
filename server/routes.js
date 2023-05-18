//START OF ROUTES PAGE NOT WORKING//

// const fs = require('node:fs/promises')
// const router = require('express').Router()

// const data = __dirname + '/data/data.json'

// //route for create profile page - to be moved
// router.get('/createProfile', (req, res) => {
//   return res.render('createProfile')
// })

// // create profile route - to be moved
// router.post('/createProfile', (req, res) => {
//   const { image } = req.files
//   if (!image) return res.sendStatus(400)
// // move image to public folder
// image.mv(__dirname + '/public/' + image.name)
// // read cat data.json file to find id
// // create object for new cat
// // append new object to existing data araray
// fs.readFile(data, 'utf-8')
//   .then(catData => {
//     //parsedData == object of array from data.json
//     const parsedData = JSON.parse(catData)
//     const id = parsedData.cats.length + 1
//     //create new object for stored data
//     let newCat = {
//       id: id,
//       name: req.body.name,
//       handle: req.body.handle,
//       quote: req.body.quote,
//       image: "/" + image.name
//     }
//     //add new cat to obj/arr
//     parsedData.cats.push(newCat)
//     fs.writeFile(data, JSON.stringify(parsedData))
//     //redirect to cat profile
//     res.redirect('/profiles/' + id)
//   })
//   .catch 
// })

// module.exports = router