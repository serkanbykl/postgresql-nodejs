const express  = require('express')
const router = express.Router()
const { Client } = require('pg')
const connectionString = 'postgressql://postgres:123456@localhost:5432/yazokulu'





router.get('/:id', (req,res)=> {

    const client = new Client({
        connectionString:connectionString
    });
    client.connect()
  .then(() => {
    const sql = 'SELECT * FROM odev WHERE (id=$1);'
    const params =  [req.params.id]
    return client.query(sql, params);
  })    .then((results) =>{
    odev=results.rows
}).then(()=>{
    res.render('goruntule/odev', {
      odev:odev
      })
  })
  .catch((err)=>{
    console.log('error', err);
    res.send('Something Bad!');
  });
})



router.get('/cevap/:id', (req,res)=> {

    const client = new Client({
        connectionString:connectionString
    });
    client.connect()
  .then(() => {
    const sql = 'SELECT * FROM odev_gonderilen WHERE (id=$1);'
    const params =  [req.params.id]
    return client.query(sql, params);
  })    .then((results) =>{
    odev=results.rows
}).then(()=>{
    res.render('goruntule/cevap', {
      odev:odev
      })
  })
  .catch((err)=>{
    console.log('error', err);
    res.send('Something Bad!');
  });
})





//Module Exports
module.exports = router