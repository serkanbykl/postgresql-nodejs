const express  = require('express')
const router = express.Router()
const { Client } = require('pg')
const connectionString = 'postgressql://postgres:123456@localhost:5432/yazokulu'
const session = require('express-session')




router.get('/', (req,res)=>{
    res.render('hoca-giris')
  })
  
router.post('/',(req, res)=>{
    const client = new Client({
      connectionString:connectionString
    });
  
  
  
    client.connect()
    .then(()=>{
      return client.query('SELECT * FROM hoca;')
    })
    .then((results) =>{
  
        hoca=results.rows
        
        hoca.forEach(element => {
          if(element.hocausername==req.body.hocausername && element.hocapassword==req.body.hocapassword){
            req.session.hoca=1;
            req.session.hocaid=element.id
          }
          else{
            req.session.hoca=0;
          }
        }) 
        if (req.session.hoca==1) {
          res.redirect('hoca/index')
        }else{
          res.redirect('/hoca')

        }
    })
    .catch((err)=>{
      console.log('error', err);
      res.send('Something Bad!');
    });
  })




router.get('/index',(req,res)=>{
  res.render('hoca/index')
})


  
router.get('/odev', (req, res)=>{

  
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
    return client.query('SELECT * FROM ders;')
  })
  .then((results) =>{

      ders=results.rows
      
  }).then(()=>{
    const sql = 'SELECT * FROM odev WHERE hocaid=$1;'
    const params=[req.session.hocaid]
    return client.query(sql,params)
  })
  .then((results) =>{

      odev=results.rows
      
  })
  .then(()=>{
    res.render('hoca/odev-gonder', {
      fakulte:fakulte,
      bolum:bolum,
      ders:ders,
      odev:odev
        })
  })
  .catch((err)=>{
    console.log('error', err);
    res.send('Something Bad!');
  });

})

router.post('/odev', (req, res) =>{

  const client = new Client({
    connectionString:connectionString
});
client.connect()
  .then(() => {
    //const sql = 'INSERT INTO odev (fakulteid, bolumid, dersadi, odevaciklama, odevadi,hocaid) VALUES ($1, $2, $3, $4, $5, $6)'
    //PROCEDURE
    const sql ='CALL insert_odev($1,$2,$3,$4,$5,$6);'
    const params = [req.body.fakid, req.body.bolid, req.body.dersadi, req.body.odevaciklama, req.body.odevadi, req.session.hocaid];
    return client.query(sql, params);
  })
  .then((result) => {
    res.redirect('/hoca/odev');
  })
  .catch((err) => {
    res.redirect('/404');
  });
})
  


router.get('/sil/:id',(req,res)=>{
  const client = new Client({
    connectionString:connectionString
  });
  client.connect()
 .then(()=>{
   const sql = 'SELECT * FROM odev WHERE id=$1 and hocaid=$2;'
   const params = [req.params.id,req.session.hocaid]
    return client.query(sql,params)
  })
  .then((results) =>{

      odev=results.rows
      
  }).then(()=>{
    res.render('hoca/odev-sil', {

      odev:odev
        })
  })
  .catch((err)=>{
    console.log('error', err);
    res.send('Something Bad!');
  });

})

router.post('/sil/:id',(req,res)=>{
  const client = new Client({
    connectionString:connectionString
  });
  client.connect()
 .then(()=>{
   const sql = 'DELETE FROM odev WHERE id=$1;'
   const params = [req.params.id]
  client.query(sql,params)
  }).then(()=>{
    const sql = 'DELETE FROM odev_gonderilen WHERE odevid=$1;'
    const params = [req.params.id]
   client.query(sql,params)
  }).then(()=>{
    res.write('Odev Silindi')
    res.end();
  })
  .catch((err)=>{
    console.log('error', err);
    res.send('Something Bad!');
  });
})



router.get('/teslim', (req,res)=>{
  const client = new Client({
    connectionString:connectionString
  });
  client.connect().then(()=>{
   const sql = 'SELECT * FROM odev_gonderilen WHERE hocaid=$1;'
   const params = [req.session.hocaid]
   return client.query(sql,params)
  }).then((results) =>{
    odevgonderilen=results.rows
    }).then(()=>{
  res.render('hoca/odev-teslim', {
    odevgonderilen:odevgonderilen
      })
}).catch((err)=>{
    console.log('error', err);
    res.send('Something Bad!');
  });
})

function escapeRegex(text) {
};

router.get("/ara", (req, res) => {
  if (req.query.ara) {
     const ara = "%" + req.query.ara + "%"
     const client = new Client({
      connectionString:connectionString
    });
    client.connect().then(()=>{
      const sql ='SELECT * FROM odev_gonderilen WHERE hocaid=$1 AND odevadi LIKE $2;'
     //const sql = 'SELECT * FROM odev_gonderilen WHERE hocaid=$1 AND $2 LIKE (SELECT odevadi FROM odev_gonderilen WHERE hocaid=$3);'
     const params = [req.session.hocaid, ara]
     return client.query(sql,params)
    }).then((results) =>{
      odevgonderilen=results.rows
      }).then(()=>{
    res.render('hoca/odev-teslim', {
      odevgonderilen:odevgonderilen
        })
  }).catch((err)=>{
      console.log('error', err);
      res.send('Something Bad!');
    });


  }
})


    //Module Exports
module.exports = router