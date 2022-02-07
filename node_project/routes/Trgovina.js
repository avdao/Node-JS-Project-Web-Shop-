var express = require('express');
var router = express.Router();
var   expressSanitizer = require("express-sanitizer");

var kupac1= require("./index");

router.use(expressSanitizer());

const KategorijaArtikla = require("../models/KategorijaArtikla");
const Trgovina = require("../models/Trgovina");
const Artikl = require("../models/Artikl");


const KategorijaTrgovina = require("../models/KategorijaTrgovina");

const verifyJWT = require("./JWT");
var io=null;

var prvi_id=null;


var varr=require('./JWT')
var chatkom=require('./JWT')
const Profile = require("../models/Profil");
const User = require("../models/users");
const Chat = require("../models/Chat");
const OcijenaArtikla = require("../models/OcjenaArtikla");
const Interesi = require("../models/Interesi");
const KljucneRijeci = require("../models/kljucneRijeci");

const Zabrana = require("../models/Zabrana");
const GrupnePoruke = require("../models/GrupnePoruke");
const Obavijesti = require("../models/Obavijesti");
const {ObjectID} = require("bson");

const Chat2 = require("../models/Chat2");
const date = require("date-and-time");
const Arhiva = require("../models/Arhiva");
const {ulogaaa} = require("./JWT");
var poruke=[];
require('events').EventEmitter.prototype._maxListeners = 100;
var io1=null
router.get('/grupnePoruke/:oblast', async function(req, res, next) {

    var poruke1=await GrupnePoruke.find({'role':req.params.oblast})


    if(!io1){
        io1=require('socket.io')(req.connection.server)


        for(let i=0;i<poruke1.length;i++){
            poruke.push(poruke1[i].poruke)
        }
        console.log(poruke)
        io1.sockets.on('connection',function(client){
            console.log("Konektovan")
            client.emit('sve_poruke',poruke.toString())
            if(!prvi_id){
                prvi_id=client.id
            }



            client.on('mojaPoruka',async function (d) {
                poruke.push(d)
                io1.emit('porukaSaServera', d)
                obavijesti.push("Korisnik vam je poslao poruku")





                const chat = new GrupnePoruke({
                    role:req.params.oblast,
                    poruke: d

                })

                try {
                    await chat.save()

                } catch (eror) {
                    res.status(400).send(eror)
                }


            })

            client.on('disconnect',function (){
                poruke=[]
                io1=null
                console.log("Disconection Event")
            })
        })
    }
    res.render('p.ejs', { });


});






router.get('/poruke',verifyJWT,async function (req,res){
    if(varr.ulogaaa==="Trgovac" || varr.ulogaaa==="Kupac"){
        var idzaDistinct= await Chat.distinct('korisnik1')
        console.log(idzaDistinct)
        poruke=[]
        var korisnikP=await Chat2.find({'primio_id':kupac1.kupac})
        console.log(korisnikP)
        var niz=[]
        for(let i=0;i<korisnikP.length;i++){
            var s=''
            s+=korisnikP[i].poslao_id
            niz.push(s)
        }
        var ispisati=Array.from(new Set(niz))
        console.log("OVO GLEDAT",ispisati)




        res.render('poruke.ejs',{korisnik:ispisati,ulogovan:kupac1.kupac,id:kupac1.kupac,uloga:varr.ulogaaa})
    }
    else {
        res.send("Nemate nikakva ovlastenja za pristup")
    }

})







router.get('/kupac',verifyJWT,async function(req, res, next) {
if(varr.ulogaaa==="Kupac"){
    try {
        var boool=false
        var slikaProfila=await Profile.findOne({'username_id':kupac1.kupac})
        if(slikaProfila===null){
            boool=true
            console.log(boool)
        }
        console.log(boool)

        poruke=[]
        console.log(poruke)
        var trgovina= await Artikl.find()

        var artikli1=[]
        let vet=[]
        var pretragaArtikala;
        var kljucneRijeci;
        var niz11=[];
        var niz12=[];
        var  brojac=0;
        var zanimanja= await Interesi.find({'prijavljeni_id':kupac1.kupac} )
        zanimanja.forEach(function (data){
            brojac+=1
            niz12.push((data.interesovanja).toString())

        })
        console.log(niz12)
        console.log(brojac)

        for (var i=0;i<brojac;i++) {
            kljucneRijeci = await KljucneRijeci.find({'kljucneRijeci': niz12[i]})
            kljucneRijeci.forEach(function (d) {

                niz11.push((d.artikal_id).toString())

            })
        }

        var niz=Array.from(new Set(niz11))
        console.log(niz)



        /*  for(let i=1;i<brojac;i++) {
              kljucneRijeci = await KljucneRijeci.find({'kljucneRijeci': niz12[i].interesovanja})

              niz11.push((kljucneRijeci[i].artikal_id).toString())
          }
  console.log(niz11)*/
        console.log(niz.length)
        let broj=0
        broj+=niz.length
        var iniz=[];
        niz.forEach(function (data){
            iniz.push(new ObjectID(data))

        })

        console.log(iniz)


        for(let i=0;i<iniz.length;i++){
            pretragaArtikala = await Artikl.find({"_id":iniz[i]})
            console.log(pretragaArtikala)
            pretragaArtikala.forEach(function (data){
                artikli1.push({ime: data.name, slika: data.avatar})
                console.log(artikli1)
            })
        }




        for(let i=0;i<3;i++){
            let a=Math.floor(Math.random() * (trgovina.length - 0));
            vet.push(trgovina[a])

        }



        const korisnik=await User.find({})



        let ocjena=await OcijenaArtikla.find();

        let izbaciArtikleSaNajvisomOcjenom=ocjena.reduce((max,mark)=>max.ocijena>mark.ocijena?max:mark)


        let artikal= await Artikl.find({"_id":izbaciArtikleSaNajvisomOcjenom.artikal_id})
        let izbaciArtikleSaNajmanjomKolicinom=trgovina.reduce((max,mark)=>max.kolicina<mark.kolicina?max:mark)





        res.render('kupac.ejs', { title: 'Express',boool:boool,id:kupac1.kupac, trgovina:trgovina,slika:slikaProfila ,
            ulogovan:kupac1.kupac,korisnik:korisnik,trgovina1:vet,najvecaOcjena:artikal,najmanjaKolicina:izbaciArtikleSaNajmanjomKolicinom,artikli12:artikli1});
    } catch (eror) {
        res.send(eror)
    }
}
else{
    res.send("Nemate ovlastenja za pristup stranici")
}


});



router.get('/admin', async function(req, res, next) {

const korsnik=await User.find({})

    var brojacTrgovaca=0
    var brojacKupaca=0

    for(let i=1;i<korsnik.length;i++){
        if(korsnik[i].role==="Trgovac"){
            brojacTrgovaca+=1
        }
        else {
            brojacKupaca+=1
        }
    }





        res.render('admin.ejs', { title: 'Express',bt:brojacTrgovaca,bk:brojacKupaca,korisnik:korsnik });


} )



router.post("/pukniBan",async (req, res) => {

    const date = require('date-and-time')
    const now = new Date();


    const value = date.addDays(now, 15);


    console.log("updated date and time : " + value)
    const zabrana = new Zabrana({
        prijavljeni_id:req.body.idAdmin,
        username:req.body.username,
    date:value

    })

    try {
        await zabrana.save()
        res.redirect('/trgovina/admin')
    } catch (eror) {
        res.status(400).send(eror)
    }

})







router.get("/", verifyJWT,async (req, res) => {
    if(varr.ulogaaa==="Kupac"){
        try {
            var trgovina= await Trgovina.find({})
            console.log(trgovina)
            res.render("Trgovina.ejs", {trgovina:trgovina,uloga:varr.ulogaaa,id:kupac1.kupac})
        } catch (eror) {
            res.status(400).send(eror)
        }
    }
    else {
        res.send("Nema  ovlastenja")
    }




});




router.get("/dodajTrgovinu",verifyJWT, async (req, res) => {
    if(varr.ulogaaa==="Trgovac"){
        var kategorija=await KategorijaTrgovina.find({})
        res.render("dodajTrgovinu.ejs",{kategorija:kategorija,id:kupac1.kupac});
    }
    else {
        res.send("Nemate ovlastenja.")
    }

});
router.post("/kategorijaa",async (req, res) => {
    const trgovina = new KategorijaTrgovina({
        kategorija:req.body.kategorija

    })

    try {
        await trgovina.save()
        res.redirect('/trgovina/admin')
    } catch (eror) {
        res.status(400).send(eror)
    }

})

router.post("/kategorijaArtikla",async (req, res) => {
    const trgovina = new KategorijaArtikla({
        kategorija:req.body.kategorija

    })

    try {
        await trgovina.save()
        res.redirect('/trgovina/admin')
    } catch (eror) {
        res.status(400).send(eror)
    }

})
router.post("/dodajTrgovinu",verifyJWT,async (req, res) => {
    if(varr.ulogaaa==="Trgovac"){
    const trgovina = new Trgovina({
        users_id:kupac1.kupac,
        name:req.body.name,
        telefon:req.body.telefon,
        email:req.body.email,
        adresa: req.body.adresa,
        category: req.body.category

    })

    try {
        await trgovina.save()
        res.redirect('/trgovina/dodajTrgovinu')
    } catch (eror) {
        res.status(400).send(eror)
    }}
    else {
        res.send("Nemate ovlastenja")
    }

})
router.get('/edit/(:id)', async (req, res) => {

    const _id = req.params.id
    let company1=[];
    try {
        var trgovina = await Trgovina.findById(_id)

        company1.push(trgovina)
        console.log(company1)
        res.render("updateTrgovina.ejs", {company1})
    } catch (eror) {
        res.status(400).send(eror)
    }

})


router.get('/tvojeTrgovine/(:id)', async (req, res) => {

    const _id = req.params.id
    let company1=[];
    try {
        var trgovina = await Trgovina.find({'users_id':_id})


        company1.push(trgovina)
        console.log(company1)
        res.render("TvojeTrgovine.ejs", {company1:trgovina ,id:kupac1.kupac})
    } catch (eror) {
        res.status(400).send(eror)
    }

})






router.post('/edit/:id',  async (req, res) => {

    var trgovina = {
        name         : req.body.name,
        telefon         : req.body.telefon,
        email  :        req.body.email,
        adresa :      req.body.adresa,
        category      : req.body.category
    }

    try {
        const employee = await Trgovina.findByIdAndUpdate(req.params.id, trgovina, { new: true, runValidators: true })

        if (!employee) {
            return res.status(404).send()
        }

        res.redirect('/trgovina/trgovac')
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/delete/:id', async (req, res) => {
    try {
        const employee = await Trgovina.findByIdAndDelete(req.params.id)

        if (!employee) {
            return res.status(404).send()
        }

        res.redirect('/trgovina')
    } catch (e) {
        res.status(500).send()
    }
})

var obavijesti=[]
router.get('/:korisnik1/:korisnik2',verifyJWT,async function(req, res, next) {
var ime;
var ime1;
if(chatkom.idzaChat===req.params.korisnik2){

    var poruke1=await Chat2.find({'primio_id':req.params.korisnik2,'poslao_id':req.params.korisnik1})
   var poruke12=await Chat2.find({'poslao_id':req.params.korisnik2,'primio_id':req.params.korisnik1})
    var poruke11=[]
    poruke1.forEach(function (data){
        poruke11.push(data.poruke)
    })
    ime= await User.findById(req.params.korisnik2)
    ime1=ime.username

          //  console.log(poruke1)
            if(!io){
                io=require('socket.io')(req.connection.server)



        }
    for(let i=0;i<poruke1.length;i++) {

        poruke.push((poruke12[i].poruke).toString())

        poruke.push('\n')

        poruke.push(poruke11[i])


    }
        console.log(poruke)
        io.sockets.on('connection',function(client){
            console.log("Konektovan")

                client.emit('sve_poruke',poruke.toString())


            if(!prvi_id){
                prvi_id=client.id
            }


            client.on("send-notification", function (data) {
                io.to(prvi_id).emit("new-notification", data);



            });


            client.on('disconnect',function (){
                poruke=[]
                io=null
                console.log("Disconection Event")
            })




            client.on('mojaPoruka',async function (d) {
                poruke.push(d)
                io.emit('porukaSaServera', d)
                obavijesti.push("Korisnik vam je poslao poruku")




              /*  const chat = new Chat({
                    korisnik1: req.params.korisnik1,
                    korisnik2: req.params.korisnik2,
                    poruke: d

                })*/


                const ime2=await User.findById(req.params.korisnik1)

                console.log(ime2.username)

                const chat1=new Chat2({
                    poslao:ime.username,
                    poslao_id:ime.id,
                    primio:ime2.username,
                    primio_id:ime2._id,
                    poruke:d
                })

                try {
                   // await chat.save()
                    await chat1.save()
                    console.log(chat1)


                } catch (eror) {
                    res.status(400).send(eror)
                }



            })
            })}else {
    var id1=req.params.korisnik1;
    var id2=req.params.korisnik2

    var poruke12=await Chat2.find({'primio_id':id1,'poslao_id':id2})
    var poruke1=await Chat2.find({'poslao_id':req.params.korisnik1,'primio_id':req.params.korisnik2})
    var poruke11=[]
    poruke1.forEach(function (data){
        poruke11.push(data.poruke)
    })

    ime= await User.findById(req.params.korisnik1)
    ime1=ime.username


    if(!io){
        io=require('socket.io')(req.connection.server)



    }
    for(let i=0;i<poruke12.length;i++) {
        poruke.push((poruke12[i].poruke).toString())

        poruke.push('\n')

            poruke.push((poruke11[i]))


    }
    console.log(poruke)
    io.sockets.on('connection',function(client){
        console.log("Konektovan")

       // client.emit('sve_poruke',poruke.toString())


        if(!prvi_id){
            prvi_id=client.id
        }



        client.on('disconnect',function (){
            poruke=[]
            io=null
            console.log("Disconection Event")
        })

        client.on('mojaPoruka',async function (d) {
            poruke.push(d)
        io.emit('porukaSaServera', d)
            obavijesti.push("Korisnik vam je poslao poruku")




            /*  const chat = new Chat({
                  korisnik1: req.params.korisnik1,
                  korisnik2: req.params.korisnik2,
                  poruke: d

              })*/


            const ime2=await User.findById(req.params.korisnik2)

            console.log(ime2.username)

            const chat1=new Chat2({
                poslao:ime.username,
                poslao_id:ime.id,
                primio:ime2.username,
                primio_id:ime2._id,
                poruke:d
            })

            try {
                // await chat.save()
                await chat1.save()
                console.log(chat1)

                const us=User.findOne({"username":req.params.korisnik2})



            } catch (eror) {
                res.status(400).send(eror)
            }


        })
    })


}
    res.render('chat.ejs', {poruke:poruke,poslao1:ime1});
    })






router.get('/trgovac',verifyJWT , async function(req, res, next) {
    prvi_id=null;
    poruke=[]

    console.log("Poruke",poruke)

    console.log(varr.ulogaaa)
    if(varr.ulogaaa==="Trgovac"){
        try {
            var o= await Obavijesti.find({"posalji_id":kupac1.kupac})

            var len=0+o.length;
            const korisnik=await User.find({})
            var trgovina;
            var niz1=[];
            var kupacc=await Trgovina.find({'users_id':kupac1.kupac})
            for(var i=0;i<kupacc.length;i++){
                trgovina= await Artikl.find({'trgovina_id':kupacc[i].id})
                trgovina.forEach(function (data){
                    niz1.push({name:data.name,kratkiOpis:data.kratkiOpis,kolicina:data.kolicina,avatar:data.avatar,_id:data._id})
                })
            }



                res.render('trgovac.ejs', { title: 'Express',id:kupac1.kupac,ob:len, trgovina:niz1,
                    korisnik:korisnik ,ulogovan:kupac1.kupac,uloga:varr.ulogaaa});
            } catch (eror) {
            res.status(400).send(eror)
        }
    }
    else {
        res.send("Niste ovlasteni za rutu")
    }

});

router.get('/posaljiPoruku', function(req, res, next) {
    poruke=[]
    res.render('posaljiPoruku.ejs', { title: 'Express' });
});



router.get('/arhivirajKorisnika',async function(req, res, next) {
    const korsnik=await User.find({})


    res.render('arhivirajKorisnika.ejs', { title: 'Express',korisnik:korsnik });
});

router.post("/arhiviraj",async (req, res) => {

    const date = require('date-and-time')
    const now = new Date();


    const value = date.addDays(now, 15);


    console.log("updated date and time : " + value)
    const arhiva = new Arhiva({
        prijavljeni_id:req.body.idAdmin,
        username:req.body.username,
        date:value

    })

    try {
        await arhiva.save()
        res.redirect('/trgovina/admin')
    } catch (eror) {
        res.status(400).send(eror)
    }

})





module.exports=router;