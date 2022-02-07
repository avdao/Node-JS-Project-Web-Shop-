var express = require('express');
var router = express.Router();
var uloga11= require("./index");


  router.get('/k', function(req, res, next) {
if(uloga11.uloga1==="Trgovac"){
  console.log("Ovo treba biti neka uloga",uloga11.uloga1)
  res.render('k.ejs', { title: 'Express' });
}
else {
  res.redirect('/users/m')
}

  });




  router.get('/m', function(req, res, next) {

    console.log("Ovo treba biti neka uloga",uloga11.uloga1)
    res.render('k1.ejs', { title: 'Express' });
  });


module.exports = router;
