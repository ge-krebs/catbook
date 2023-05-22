const express = require('express')
const hbs = require('express-handlebars')
//require promises note needed currently
// const fs = require('node:fs/promises')
const fileUpload = require('express-fileupload')

const { parse } = require('node:path')

const server = express()

//get data from json file into variable
// const data = __dirname + '/data/data.json'

const routes = require('./routes')

//middleware
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')
server.use(express.static(__dirname + '/public'))

//file upload
server.use(fileUpload())
server.use(express.urlencoded({ extended: false }))

server.use('/', routes)

module.exports = server
