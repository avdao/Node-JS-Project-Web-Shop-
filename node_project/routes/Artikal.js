const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const Artikl = require("../models/Artikl");
const Trgovina = require("../models/Trgovina");


var express = require('express');
var router = express.Router();
var   expressSanitizer = require("express-sanitizer");



router.use(expressSanitizer());

const kupac1 = require("./index");
const Interesi = require("../models/Interesi");
const KljucneRijeci = require("../models/kljucneRijeci");
const niz=[];
var uloga112=require('./index')


router.post('/ocijeniArtikal',async (req,res)=>{



    const artikal = new OcijenaArtikla({
        kupac:kupac1.ime,
            artikal_id: req.body.idA,
            comment:req.body.komentar,
        ocijena:req.body.ocijena123,
        }

    )

    try {
        await artikal.save()
        console.log(artikal)
        res.redirect('back')
       // res.redirect('/trgovina/kupac')
    } catch (eror) {
        res.status(400).send(eror)
    }

})


router.get('/123/artikal/:id', async (req, res) => {
    var id=req.params.id;
    var artikal= await Artikl.findById(id);
    var object=await OcijenaArtikla.find({'artikal_id':id})

    console.log(artikal)
    res.render('artikal_id.ejs',{artikalll:artikal,objekat:object})


})


router.post('/dodajArtikal', upload.single("image"), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);


    const artikl = new Artikl({
            name: req.body.name,
            kratkiOpis:req.body.kratkiOpis,
            trgovina_id:req.body.trgovina_id,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
             kljucne_rijeci:niz,
            category: req.body.category,
            kolicina:req.body.kolicina,
            cijena:req.body.cijena
        }

    )

    try {
        await artikl.save()
        console.log(artikl)
        res.redirect('/trgovina/trgovac')
    } catch (eror) {
        res.status(400).send(eror)
    }


})
const KategorijaArtikla = require("../models/KategorijaArtikla");
const jwt = require("jsonwebtoken");
const OcijenaArtikla = require("../models/OcjenaArtikla");
const User = require("../models/users");
const uloga111 = require("./index");
const {ObjectID} = require("bson");
const {ObjectId} = require("mongodb");
router.get("/dodajArtikal", async (req, res) => {
    try {
        var trgovina= await Trgovina.find({'users_id': kupac1.kupac})
        var kategorijaa=await  KategorijaArtikla .find({})
        console.log(trgovina)
        res.render("dodajArtikal.ejs", {trgovina:trgovina,kategorijaa:kategorijaa})
    } catch (eror) {
        res.status(400).send(eror)
    }

});
router.get('/(:id)', async (req, res) => {

    const _id = req.params.id
    const teams = await Artikl.find({  'trgovina_id': _id });

    if (!teams) {
        req.status(404).send()
    }

    try {

        var employee = await Trgovina.findById(_id)
        console.log("Employee Trgovina:",employee.users_id)
        module.exports.idOdSefa=employee.users_id;
        var object=[]
        for (var i = 0; i < teams.length; i++) {
            var currentTeam = teams[i];

            if(parseInt(currentTeam.kolicina)<=0){
                artikal=await Artikl.findByIdAndDelete(currentTeam.id)

            }
            object.push({
                employee_name: employee.name,
                team_name: currentTeam.name,
                team_name1:currentTeam.id,
                meal_name:currentTeam.avatar,
                kolicina:currentTeam.kolicina


            })
            console.log(object)
        }



        res.render('Info.ejs',{object:object,arhiviran:uloga112.arhiviran1,id:kupac1.kupac})
    } catch (eror) {
        res.status(400).send(eror)
    }

})
var id;

var id1;
router.get('/editkljucneRijeci/:id', async function(req, res, next) {

    id1 = req.params.id;
    try {
        var trgovina = await KljucneRijeci.find({'artikal_id':ObjectId(req.params.id)})
        console.log(trgovina)
        res.render("updatekljucneRijeci.ejs", {trgovina: trgovina})
    } catch (eror) {
        res.status(400).send(eror)
    }


    router.post('/editKljucniRijeci',  async (req, res) => {

        var trgovina = {
            kljucneRijeci:req.body.kljucneRijeci
        }
        console.log(id1)
        try {
            const employee = await KljucneRijeci.findByIdAndUpdate(req.body.id123, trgovina, { new: true, runValidators: true })
console.log(employee)
            if (!employee) {
                return res.status(404).send()
            }


            res.redirect('/trgovina/trgovac')
        } catch (e) {
            res.status(400).send(e)
        }
    })
})


router.get('/kljucneRijeci/:id', async function(req, res, next) {

    id=req.params.id;
    var boool=false
    try {
        var trgovina= await KljucneRijeci.find({'artikal_id': id})
        if (trgovina===null){
            boool=true
        }



        console.log(trgovina)
        res.render("kljucneRijeci.ejs", {trgovina:trgovina,boool:boool})
    } catch (eror) {
        res.status(400).send(eror)
    }


    router.post('/kljucneRijeci', function(req, res, next) {
        const interesovanja=new KljucneRijeci({
            artikal_id:id,
            kljucneRijeci:req.body.kljucneRijeci
        })
        console.log(interesovanja)
        interesovanja.save()
        res.redirect('/trgovina/trgovac')
    });



});






module.exports=router;