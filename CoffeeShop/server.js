
const bcrypt=require("bcryptjs");
const express= require("express");
const session=require("express-session");
const MongoDBSession=require('connect-mongodb-session')(session);
const mongoose=require("mongoose");
const path = require('path');
const app=express();
const UserModel=require('./models/User');
const ProdusModel=require('./models/Produs');
const Cart=require('./models/Cart');
const mongoURI="mongodb://localhost:27017/sessions";
const bodyParser = require('body-parser')



mongoose.connect(mongoURI,{
})
.then((res)=>{
    console.log('mongo ok');
});


const store=new MongoDBSession({
    uri:mongoURI,
    collection:'mySessions',
});


app.set("view engine" ,"ejs");
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json())


app.use(session({
    secret:'key',
    resave:false,
    saveUninitialized:false,
    store: store,
}));

const autentificare=(req,res,next)=>{
    if(req.session.autentificare){
        next();
    }
    else{
        res.redirect('/login');
    }
}



app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/css_js", express.static(path.join(__dirname, "css_js")));



app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, '/index_copy.html'));
});

app.get("/meniu.html", function(req, res){
    res.sendFile(path.join(__dirname, '/meniu.html'));
});


app.get("/form.html", function(req, res){
    res.sendFile(path.join(__dirname, '/form.html'));
});


app.get("/form_confirmare.html", function(req, res){
    res.sendFile(path.join(__dirname, '/form_confirmare.html'));
});





app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/meniu.html');
    })
});


app.get("/login",(req,res)=>{

    if (!req.session.logged_in) {
        res.render("login");
    }
});


app.post("/login", async (req, res) => {
    if (req.session.logged_in) {
        return; // Termină executarea pentru a evita redirecționarea suplimentară
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.redirect('/login');
    }

    const potrivire = await bcrypt.compare(password, user.password);

    if (!potrivire) {
        return res.redirect('/login');
    }

    req.session.userId = user._id;
    req.session.autentificare = true;
    req.session.logged_in = true;
    res.redirect('/meniu.html');
});


app.get("/inregistrare",(req,res)=>{

    res.render("inregistrare");

});


app.post("/inregistrare",async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        let user=await UserModel.findOne({email});
        if(user){
            return res.redirect('/inregistrare');
        }

        const Pw=await bcrypt.hash(password,12);
        user=new UserModel({
            username,
            email,
            password:Pw
        });

        await user.save();
        res.redirect("/login");
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Eroare la inregistare' });
    }
});



app.put("/update-account", async (req, res) => {
    try {

        const userId = req.session.userId;
        const newUsername=req.body.newUsername;
        await UserModel.findByIdAndUpdate(userId, { username: newUsername });
        res.send({ message: 'Contul a fost actualizat cu succes' });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Eroare la actualizarea  contului' });
    }
});


app.get("/Update",autentificare,(req,res)=>{

    res.render("Update");

});



app.get("/check-authentication", (req, res) => {
    try 
    {
        if (req.session.logged_in)
            res.sendStatus(200);
        else 
            res.sendStatus(401);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).send({ message: 'Eroare la verificarea autentificării' });
    }
});




app.delete("/delete-account", async (req, res) => {
    try 
    {
        const userId = req.session.userId;
        await UserModel.findByIdAndDelete(userId);
        req.session.destroy();
        res.send({ message: 'Contul a fost șters cu succes' });

    } 
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Eroare la ștergerea contului' });
    }
});




app.get("/comanda", autentificare, function(req, res) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    res.render('comanda', { cart: cart });
});



app.get('/add-to-cart/:id',autentificare, async function(req, res, next) {
    try {
        var productId = req.params.id;
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        var product = await ProdusModel.findById(productId);

        if (!product) {
            return res.redirect('/404pg.html');
        }

        cart.add(product, productId);
        req.session.cart = cart;



        res.redirect('/meniu.html');
    } 
    catch (err) 
    {
      res.status(404).send({ message: 'Eroare la gasirea paginii'});
      res.redirect("/404pg.html");
    }
});



app.get("/delete_element/:id",autentificare, function(req,res ){

    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var itemId=req.params.id;
    cart.delete(itemId);
    req.session.cart = cart;
    res.redirect('/comanda');

});



app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, '/404pg.html'));
})

app.listen(5000, console.log("running -  http://localhost:5000"));