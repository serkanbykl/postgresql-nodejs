const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Client } = require('pg')
const pgCamelCase = require('pg-camelcase')
const connectionString = 'postgressql://postgres:123456@localhost:5432/yazokulu'
pgCamelCase.inject(require('pg'))

require('dotenv').config();



const app = express()

const mustache = mustacheExpress()

mustache.cache = null

app.engine('mustache', mustache)
app.set('view engine', 'mustache')


app.use(session({
  secret: 'hakk', // güvenlik anahtarı
  resave: false, // session kaydet
  saveUninitialized: true // 
}))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES
const ogrenci = require('./routes/ogrenci')
const hoca = require('./routes/hoca')
const admin = require('./routes/admin')
const goruntule = require('./routes/goruntule')

app.use('/ogrenci', ogrenci)
app.use('/hoca', hoca)
app.use('/admin', admin)
app.use('/goruntule', goruntule)


app.listen(process.env.PORT, process.env.HOSTNAME, ()=> {
    console.log(`Listening on port http://${process.env.hostname}:${process.env.PORT}`)
})