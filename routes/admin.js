const express  = require('express')
const router = express.Router()
const { Client } = require('pg')
const connectionString = 'postgressql://postgres:123456@localhost:5432/yazokulu'
const session = require('express-session')



router.get('/', (req,res)=>{
    res.render('admin-giris')
  })


router.post('/',(req,res)=>{
    const client = new Client({
      connectionString:connectionString
    });
    client.connect()
    .then(()=>{
      return client.query('SELECT * FROM admin;')
    })
    .then((results) =>{
  
        admin=results.rows
        
        admin.forEach(element => {
          if(element.username==req.body.username && element.password==req.body.password){
            req.session.admin=1;
            res.redirect('admin/index')
          }
          else{
            req.session.admin=0;
          }
        });
    })
    .catch((err)=>{
      console.log('error', err);
      res.send('Something Bad!');
    });
  })


router.get('/index', (req,res)=>{
    if(req.session.admin){
      res.render('admin/index')
    }
    else{
      res.redirect('/admin')
    }
  })
  





  
router.get('/ogrenci', (req, res)=>{

  
    const client = new Client({
      connectionString:connectionString
    });
    client.connect()
    .then(()=>{
      return client.query('SELECT * FROM fakulte;')
    })
    .then((results) =>{
  
        fakulte=results.rows
    })
    .then(()=>{
      return client.query('SELECT * FROM bolum;')
    })
    .then((results) =>{
  
        bolum=results.rows
        
    }).then(()=>{
      res.render('admin/ogrenci-kayit', {
        fakulte:fakulte,
        bolum:bolum
      })
    })
    .catch((err)=>{
      console.log('error', err);
      res.send('Something Bad!');
    });
  
  })
  
  
router.post('/ogrenci', (req, res) =>{
  console.log(req.body.fakid)
    const client = new Client({
      connectionString:connectionString
  });
  client.connect()
    .then(() => {
      //const sql = 'INSERT INTO ogrenci (dogumtarihi, ogrencihakkinda, ogrenciiletisim, bolumid, fakulteid, ad, soyad, ogrenciusername, ogrencipassword) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
      //PROCEDURE
      const sql = 'CALL insert_ogrenci($1,$2,$3,$4,$5,$6,$7,$8,$9);' 
      const params = [req.body.dt, req.body.oh, req.body.oi, req.body.bolid, req.body.fakid,req.body.ad,req.body.soyad,req.body.ogrenciusername, req.body.ogrencipassword];
      return client.query(sql, params);
    })
    .then((result) => {
      res.redirect('/admin/ogrenci');
    })
    .catch((err) => {
      res.redirect('/404');
    });
  })



 router.get('/hoca', (req, res)=>{
  
    res.render('admin/hoca-kayit')
  })
  
  
router.post('/hoca', (req, res) =>{
    const client = new Client({
      connectionString:connectionString
  });
  client.connect()
    .then(() => {
      //const sql = 'INSERT INTO hoca (hocahakkinda, hocailetisim, hocasehir, hocaulke, hocaunvan, hocaad, hocasoyad, hocausername, hocapassword) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
      //PROCEDURE
      const sql = 'CALL insert_hoca($1,$2,$3,$4,$5,$6,$7,$8,$9);'
      const params = [req.body.hh, req.body.hi, req.body.hs, req.body.hu, req.body.hunvan,req.body.ad,req.body.soyad, req.body.hocausername, req.body.hocapassword];
      return client.query(sql, params);
    })
    .then((result) => {
      res.redirect('/admin/hoca');
    })
    .catch((err) => {
      res.redirect('/404');
    });
  })


 
  
router.get('/ders', (req, res)=>{

  
  const client = new Client({
    connectionString:connectionString
  });
  client.connect()
  .then(()=>{
    return client.query('SELECT * FROM fakulte;')
  })
  .then((results) =>{

      fakulte=results.rows
  })
  .then(()=>{
    return client.query('SELECT * FROM bolum;')
  })
  .then((results) =>{

      bolum=results.rows
      
  }).then(()=>{
    res.render('admin/ders-kayit', {
      fakulte:fakulte,
      bolum:bolum
    })
  })
  .catch((err)=>{
    console.log('error', err);
    res.send('Something Bad!');
  });

})


router.post('/ders', (req, res) =>{

  const client = new Client({
    connectionString:connectionString
});
client.connect()
  .then(() => {
    const sql = 'INSERT INTO ders (dersaciklama, dersadi,fakulteid, bolumid) VALUES ($1, $2, $3, $4)'
    const params = [req.body.daciklama, req.body.dadi, req.body.fakid, req.body.bolid];
    return client.query(sql, params);
  })
  .then((result) => {
    res.redirect('ders');
  })
  .catch((err) => {
    res.redirect('/404');
  });
})
  

router.get('/bolum', (req, res)=>{
   const client = new Client({
    connectionString:connectionString
  });
  client.connect()
  .then(()=>{
    return client.query('SELECT * FROM fakulte;')
  })
  .then((results) =>{

      fakulte=results.rows
  })
  .then(()=>{
    res.render('admin/bolum-kayit', {
      fakulte:fakulte
    })

  }).catch((err)=>{
    console.log('error', err);
    res.send('Something Bad!');
  });

})


router.post('/bolum', (req, res) =>{
  const client = new Client({
    connectionString:connectionString
});
client.connect()
  .then(() => {
    const sql = 'INSERT INTO bolum (bolumadi, fakulteid) VALUES ($1,$2)'

    const params = [req.body.bolumadi, req.body.fakulteid];
    return client.query(sql, params);
  })
  .then((result) => {
    res.redirect('/admin/bolum');
  })
  .catch((err) => {
    res.redirect('/404');
  });
})



router.get('/fakulte', (req, res)=>{
  
  res.render('admin/fakulte-kayit')
})


router.post('/fakulte', (req, res) =>{
  const client = new Client({
    connectionString:connectionString
});
client.connect()
  .then(() => {
    const sql = 'INSERT INTO fakulte (fakulteadi) VALUES ($1)'

    const params = [req.body.fakulteadi];
    return client.query(sql, params);
  })
  .then((result) => {
    res.redirect('/admin/fakulte');
  })
  .catch((err) => {
    res.redirect('/404');
  });
})
  
    //Module Exports
module.exports = router