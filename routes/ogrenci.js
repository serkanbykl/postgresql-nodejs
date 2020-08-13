const express  = require('express')
const router = express.Router()
const { Client } = require('pg')
const connectionString = 'postgressql://postgres:123456@localhost:5432/yazokulu'
const session = require('express-session')





router.get('/', (req,res)=>{
    res.render('ogrenci-giris')
  })



router.post('/',(req, res)=>{
    const client = new Client({
      connectionString:connectionString
    });

    client.connect()
    .then(()=>{
      return client.query('SELECT * FROM ogrenci;')
    })
    .then((results) =>{
  
        ogrenci=results.rows
        
        ogrenci.forEach(element => {
          if((element.ogrenciusername == req.body.ogrenciusername) && (element.ogrencipassword == req.body.ogrencipassword)){
            req.session.ogrenci=1
            req.session.fakulteid=element.fakulteid
            req.session.bolumid=element.bolumid
            req.session.ogrenciid=element.id
            req.session.ogrenciadi=element.ad
            client.end()
            res.redirect('ogrenci/index')
          }
          else{
            req.session.ogrenci=0;
          }
        });
        if (req.session.ogrenci!=1) {
          res.redirect('/ogrenci')
        }
    })
    .catch((err)=>{
      console.log('error', err);
      res.send('Something Bad!');
    });
  })



  router.get('/index', (req, res)=>{
if (req.session.ogrenci==undefined) {
  res.write("<p> <h1>PLEASE LOGIN </h1></p>")
  res.end();
}else{


      const client = new Client({
        connectionString:connectionString
      });
      client.connect()
      .then(()=>{
        const sql = 'SELECT * FROM odev WHERE (fakulteid=$1 and bolumid=$2);'
        const params = [req.session.fakulteid, req.session.bolumid]
        return client.query(sql, params)
      })
      .then((results) =>{
          odev=results.rows
      })
      .then(()=>{
        const sql = 'SELECT fakulteadi FROM fakulte WHERE (id=$1);'
        const params = [req.session.fakulteid]
        return client.query(sql, params)
      })
      .then((results) =>{
    
        fakulteadi=results.rows
    })    
    .then(()=>{
      const sql = 'SELECT bolumadi FROM bolum WHERE (id=$1);'
      const params = [req.session.bolumid]
      return client.query(sql, params)
    })
    .then((results) =>{
  
      bolumadi=results.rows
  })    .then(()=>{
    const sql = 'SELECT * FROM ogrenci WHERE (id=$1);'
    const params = [req.session.ogrenciid]
    return client.query(sql, params)
  })
  .then((results) =>{

    ogrenci=results.rows
})
      .then(()=>{
        res.render('ogrenci/index', {
          odev:odev,
          fakulteadi:fakulteadi,
          bolumadi:bolumadi,
        ogrenci:ogrenci     })
      })
      .catch((err)=>{
        console.log('error', err);
        res.send('Something Bad!');
      });
 

    }
  
  })



  router.get('/gonder/:id', (req, res)=>{
    if (req.session.ogrenci==undefined) {
      res.write("<p> <h1>PLEASE LOGIN </h1></p>")
      res.end();
    }else{
    const client = new Client({
      connectionString:connectionString
    });
    client.connect()
    .then(()=>{
      const sql = 'SELECT * FROM odev WHERE (id=$1);'
      const params = [req.params.id]
      return client.query(sql, params)
    })
    .then((results) =>{
        odev=results.rows
    })
    .then(()=>{
      const sql = 'SELECT * FROM odev_gonderilen WHERE (odevid=$1 and ogrenciid=$2);'
      const params = [req.params.id,req.session.ogrenciid]
      return client.query(sql, params)
    })
    .then((results) =>{

      if (results.rows.length>0){
        gonderilenodev=results.rows

      }else{
        gonderilenodev=5;
      }

    })
    .then(()=>{
      
      res.render('ogrenci/odev-gonder', {odev:odev, ogrenci:req.session.ogrenciid, gonderilenodev:gonderilenodev})

    })
  }
})


  
router.post('/gonder/:id', (req, res) =>{
  if (req.session.ogrenci==undefined) {
    res.write("<p> <h1>PLEASE LOGIN </h1></p>")
    res.end();
  }else{
  const client = new Client({
    connectionString:connectionString
});
client.connect()
  .then(() => {
    const sql = 'select * from odev_gonderilen where (ogrenciid=$1 and odevid=$2);'
    const params = [req.body.ogrenciid, req.body.odevid];
    return client.query(sql, params);
  }).then((results)=>{
    if (results.rows.length==1) {
      //const sql= 'UPDATE odev_gonderilen SET ogrenciid=$1, odevadi=$2, odevaciklama=$3, odevicerik=$4, fakulteid=$5, bolumid=$6, odevid=$7, dersadi=$8, ogrenciadi=$9 where (ogrenciid=$10 and odevid=$11)'
      //PROCEDURE
      const sql = 'CALL update_odev_gonderilen($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);' 
      const params = [req.body.ogrenciid, req.body.odevadi, req.body.odevaciklama, req.body.odevicerik, req.body.fakulteid,req.body.bolumid,req.body.odevid,req.body.dersadi,req.session.ogrenciadi,req.body.ogrenciid,req.body.odevid];

      return client.query(sql,params)
    }else{
      const sql = 'INSERT INTO odev_gonderilen (ogrenciid, odevadi, odevaciklama, odevicerik, fakulteid, bolumid, odevid, dersadi,ogrenciadi,hocaid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9,$10);'
      const params = [req.body.ogrenciid, req.body.odevadi, req.body.odevaciklama, req.body.odevicerik, req.body.fakulteid,req.body.bolumid,req.body.odevid,req.body.dersadi,req.session.ogrenciadi,req.session.hocaid];
      return client.query(sql,params)
    }
  })
  .then((result) => {
    res.redirect('/ogrenci/index');
  })
  .catch((err) => {
    res.redirect('/404');
  });
}
})
  
    //Module Exports
module.exports = router