
var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken');
const  bcrypt=require('bcrypt');
const User=require("../models/users");
const JWT=require("./JWT");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const Artikl = require("../models/Artikl");
const Profile = require("../models/Profil");
const Interesi = require("../models/Interesi");
const Trgovina = require("../models/Trgovina");
const verifyJWT = require("./JWT");
const Zabrana = require("../models/Zabrana");
const {kupac} = require("./index");
const Arhiva = require("../models/Arhiva");
let uloga;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register.ejs', { title: 'Express' });
});

var interesi_id;
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { title: 'Express' });
});
router.post('/register',async (req,res)=>{
  const user=req.body;
  const takenUsername=await User.findOne({username:user.username})
  const takenEmail=await User.findOne({email:user.email})

  if(takenUsername || takenEmail){
    res.json({message:"Username or email has already been token!"})

  }else{

      user.password=await bcrypt.hash(req.body.password,10)
    const dbUser=new User({
      username:user.username.toLowerCase(),
      email:user.email.toLowerCase(),
      password:user.password,
        role:user.role,
        birthday:user.birthday,


    })
    dbUser.save()
      console.log("Ovo je uloga za trgovca id:",dbUser.id)
      interesi_id=dbUser.id
      if(user.role==="Kupac"){
          res.redirect('/trgovac/interesi')
      }
      else{
          res.redirect('/login')
      }
  }
})

router.get('/trgovac/interesi', async function(req, res, next) {


    try {
        var trgovina= await Interesi.find({'prijavljeni_id': interesi_id})
        console.log(trgovina)
        res.render("interesi.ejs", {trgovina:trgovina})
    } catch (eror) {
        res.status(400).send(eror)
    }
});


router.post('/trgovac/interesi1', function(req, res, next) {
    const interesovanja=new Interesi({
        prijavljeni_id:interesi_id,
        interesovanja:req.body.interesi
    })
    interesovanja.save()
    res.redirect('/trgovac/interesi')
});



var kupac_id;
var token1;
router.post("/login",async (req,res)=>{
  const userLoggingIn=req.body;
  var uloga1;
  var kupac;
  var ime;

    console.log(userLoggingIn.username)
    var datum= await  Zabrana.findOne({username:userLoggingIn.username})


    var d1=new Date();
if(!(datum)){
    console.log("Ok")
}
    else if(datum.date && d1.getTime()<datum.date.getTime()){

        res.send("Imate zabranu pristupa Stranici!")
    }
    else{
        console.log("Datum ne postoji")
    }

    var datumArhiva= await  Arhiva.findOne({username:userLoggingIn.username})


    var d12=new Date();
    var arhiviran=false;
    if(!(datumArhiva)){
        arhiviran=false;
        module.exports.arhiviran1=arhiviran
    }
    else if(datumArhiva.date && d12.getTime()<datumArhiva.date.getTime()){

        arhiviran=true;
        module.exports.arhiviran1=arhiviran
    }
    else{
        console.log("Ok")
    }















    User.findOne({username:userLoggingIn.username})

      .then(dbUser=>{
        if(!dbUser){
          return res.json({
            message:"Invalid Username or Password"
          })

        }




        if(2+2===4){
            bcrypt.compare(userLoggingIn.password,dbUser.password)
                .then(isCorrect=>{
                    if(isCorrect){
                        const payload={
                            id:dbUser.id,
                            username:dbUser.username,
                            role:dbUser.role
                        }
                        jwt.sign(
                            payload,

                            "122f332211fgvfe",
                            {expiresIn:86400},
                            (err,token)=> {
                                if (err) return res.json({message:"Eror"})

                                if (payload.role==="Trgovac"){
                                    uloga=payload.role
                                    module.exports.uloga1=payload.role
                                    module.exports.kupac=payload.id
                                    module.exports.ime=payload.username
                                    module.exports.token=token

                                    token1=res.cookie('name', token);

                                    res.redirect('/trgovina/trgovac')


                                }
                                else if(payload.role==="Admin"){
                                    uloga=payload.role
                                    module.exports.uloga1=payload.role
                                    module.exports.kupac=payload.id
                                    module.exports.ime=payload.username

                                    res.redirect('/trgovina/admin')
                                }
                                else {

                                    uloga=payload.role
                                    module.exports.uloga1=payload.role
                                    module.exports.kupac=payload.id
                                    module.exports.ime=payload.username
                                    kupac_id=payload.id

                                    token1=res.cookie('name', token);
                                    res.redirect('/trgovina/kupac')
                                }
                                uloga1=uloga
                                console.log("Ovo je uloga1:",uloga1)
                                var decoded=jwt.verify(req.cookie('name'),"122f332211fgvfe")
                                console.log("Decoded",decoded)
                            }


                        )


                    } else {
                        return res.json({
                            message:"Invalid Username or Password!"
                        })
                    }
                })
        }else{
            res.send("There is a problem!")
        }
        })

})

router.post('/trgovac/interesi', function(req, res, next) {
    const interesovanja=new Interesi({
        prijavljeni_id:kupac_id,
        interesovanja:req.body.interesi
    })
    interesovanja.save()
    res.redirect('/trgovina/kupac')
});
router.get("/logout", (req, res) => {
    res.clearCookie("name");
    res.redirect('/')
})



router.post('/dodajSlikuProfila', upload.single("image"), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const profile = new Profile({
            username_id: kupac_id,

            avatar_profile: result.secure_url,
            cloudinary_profile_id: result.public_id,


        }

    )

    try {
        await profile.save()
        console.log(profile)
        res.redirect('/trgovina/kupac')
    } catch (eror) {
        res.status(400).send(eror)
    }


})

router.get('/trgovac/interesi/:id', async function(req, res, next) {

    var id=req.params.id;
    try {
        var trgovina= await Interesi.find({'prijavljeni_id': id})
        console.log(trgovina)
        res.render("interesinakonReg.ejs", {trgovina:trgovina,id:kupac})
    } catch (eror) {
        res.status(400).send(eror)
    }
});



module.exports = {
    router:router,

};

