


const Artikl = require("../models/Artikl");


var express = require('express');
var router = express.Router();
var   expressSanitizer = require("express-sanitizer");

var io=null;


router.use(expressSanitizer());
var uloga11= require("./index");
var ime1= require("./index");
var kupac1= require("./index");
const Narudjba = require("../models/Narudjba");
const mojaKorpa = require("../models/mojaKorpa");
const isporucenaNarudjba = require("../models/isporucenaNarudjba");
const chef = require("./Artikal");
const Trgovina = require("../models/Trgovina");
const sgMail = require('@sendgrid/mail');
var nodemailer = require('nodemailer');
const User = require("../models/users");

router.get("/isporucenaNarudjba", async (req, res) => {
    try {
        var zbir0=0;
        var narudjba1= await isporucenaNarudjba.find({})
        for(let i=0;i<narudjba1.length;i++){
            zbir0+=parseFloat(narudjba1[i].cijena)
        }


        res.render("Narudjba2.ejs", {narudjba:narudjba1,zbir0:zbir0,id:kupac1.kupac})
    } catch (eror) {
        res.status(400).send(eror)
    }





});
router.get("/:id", async (req, res) => {
    try {
        var id=req.params.id
        console.log(id)

        var narudjbe=await Narudjba.find({'res_id1':id} );


                res.render("Narudjba1.ejs", {narudjba:narudjbe,id1:kupac1.kupac})



    } catch (eror) {
        res.status(400).send(eror)
    }





});



router.get('/edit/korpa/:id', async (req, res) => {

    const _id = req.params.id
    let company1=[];
    try {
        var trgovina = await mojaKorpa.findById(_id)

        company1.push(trgovina)
        console.log(company1)
        res.render("updateKorpe.ejs", {company1})
    } catch (eror) {
        res.status(400).send(eror)
    }

})


router.post('/edit/korpa1/:id',  async (req, res) => {
    var cijena=req.body.article_id
    console.log(cijena)
    const cijena1=await Artikl.findById(cijena)
    console.log("Cijena ",cijena1)
    var narudjba = {
        nameofClient    : req.body.nameClient,
        name        :     req.body.name,
        kolicina :        req.body.kolicina,
        cijena :          cijena1.cijena *req.body.kolicina,

    }



    try {

        const employee = await mojaKorpa.findByIdAndUpdate(req.params.id, narudjba, { new: true, runValidators: true })

        if (!employee) {
            return res.status(404).send()
        }

        res.redirect('/trgovina/kupac')
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/12/:id", async (req, res) => {
    const _id = req.params.id
    let company1=[];
    try {
        var company = await Artikl.findById(_id)

        company1.push(company)
        console.log(company1)
        res.render("narudjba.ejs", {company1})

    } catch (eror) {
        res.status(400).send(eror)
    }});

router.post("/dodajUKorpu", async (req, res) => {
console.log(chef.idOdSefa)
    const narudjba = new mojaKorpa({
        cheff_ID:chef.idOdSefa,
        res_id: kupac1.kupac,
        nameofClient: ime1.ime,
        article_id: req.body.id,
        name: req.body.name,
        kolicina: req.body.kolicina,
        cijena: req.body.cijena * req.body.kolicina
    })
    try {
        await narudjba.save()
        console.log(narudjba)
        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
                ciphers:'SSLv3'
            },
            auth: {
                user: 'avvdo2011@outlook.com',
                pass: 'avdodzanic123'
            }
        });

// setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: 'avvdo2011@outlook.com', // sender address (who sends)
            to: 'avvdo2011@outlook.com', // list of receivers (who receives)
            subject: 'Hello ', // Subject line
            text: 'Hello world ', // plaintext body
            html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
        };

// send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }

            console.log('Message sent: ' + info.response);
        });
        res.redirect('/trgovina/kupac')
    } catch (eror) {
        res.status(400).send(eror)
    }

})
router.post('/delete/:id', async (req, res) => {
    try {

        const employee = await mojaKorpa.findByIdAndDelete(req.params.id)
        console.log(employee)
        if (!employee) {
            return res.status(404).send()
        }

        res.redirect('/trgovina/kupac')
    } catch (e) {
        res.status(500).send()
    }
})



router.post("/narudjba", async (req, res) => {
var broj;
    const narudjba = new Narudjba({
        res_id1: req.body.sef_id,
        artikal_id:req.body.article_id,
        nameofClient: req.body.nameClient,
        name: req.body.name,
        kolicina: req.body.kolicina,

        cijena: req.body.cijena
    })



try{

    narudjba.save()
    const brisac= await mojaKorpa.findByIdAndDelete(req.body.id1234)

    console.log(narudjba)


    res.redirect('/trgovina/kupac')


}
           catch {
        res.send("Eror")
           }



            })


var idzaNarudjbu;
var zbir=0;
router.get("/mojaKorpa/:id", async (req, res) => {
    try {
        var zbiir=0;
        var id=req.params.id
        idzaNarudjbu=id
        var narudjba= await mojaKorpa.find({'res_id': id })
        for(let i=0;i<narudjba.length;i++){
        zbiir+=parseFloat(narudjba[i].cijena)
        }



        res.render("mojaKorpa.ejs", {narudjba:narudjba,zbir:zbiir,id:kupac1.kupac})
    } catch (eror) {
        res.status(400).send(eror)
    }





});



router.post("/isporuciNarudjbu/:id", async (req, res) => {
    console.log(kupac1.kupac)
    var _id1=req.params.id
    const teams = await Narudjba.findById(_id1);
    const kolicina=await Artikl.findById(teams.artikal_id)
if(parseInt(teams.kolicina)>kolicina.kolicina){
    res.send("Nemate dovoljnu kolicinu artikla")
}
else{
    console.log("PROVJERA PRIJE PROVJERE",teams)
    const narudjba = new isporucenaNarudjba({

        nameofClient:teams.nameofClient,
        name:teams.name,
        cijena:teams.cijena,
        kolicina:teams.kolicina,


        status:req.body.isporuceno

    })
    const broj=parseInt(teams.kolicina);




    console.log("Ovo je provjera",kolicina)

    const artikal={
        name:kolicina.name,


        kolicina:kolicina.kolicina-broj,

    }

    try {
        await narudjba.save()
        const employee = await Artikl.findByIdAndUpdate(teams.artikal_id, artikal, { new: true, runValidators: true })
        const brisac=await Narudjba.findByIdAndDelete(_id1)
        console.log("Updateovana verzija",employee)
        res.redirect('/trgovina/trgovac')
    } catch (eror) {
        res.status(400).send(eror)
    }
}


})

router.post("/odbijNarudjbu/:id", async (req, res) => {
    console.log(kupac1.kupac)
    const teams = await Narudjba.findById(req.params.id);
    const narudjba = new isporucenaNarudjba({
        nameofClient:teams.nameofClient,
        name:teams.name,
        cijena:teams.cijena,
        kolicina:teams.kolicina,


        status:req.body.odbijeno})
    try {
        await narudjba.save()
        const brisac=await Narudjba.findByIdAndDelete(req.params.id)
        console.log(narudjba)
       res.redirect('back')
    } catch (eror) {
        res.status(400).send(eror)
    }

})
var query;
router.post("/pretraziRijeci12", async (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://avdao:bsphkh123@cluster0.tjxba.mongodb.net/mern_blog?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mern_blog");
        query = { category:req.body.rijec };
        dbo.collection("trgovinas").find(query).toArray(function(err, result) {
            if (err) throw err;
            res.render('pretragaPoKategoriji.ejs', {korisnik:result,id:kupac1.kupac});
            console.log(result);
            db.close();
        });
    });


})











module.exports=router;