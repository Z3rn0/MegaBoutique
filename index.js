const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const validateMiddleWare = require('./middleware/validateMiddleWare')
mongoose.set('strictQuery', false)
const Product = require('./models/products')
mongoose.connect('mongodb://localhost/MegaBoutique',{useNewUrlParser:true})

app.use('/send/:code',validateMiddleWare)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())


app.listen(3000,()=>{
    console.log("App listening on port 3000")
})

app.get('/',async (req,res)=>{
    const products = await Product.find({})
    res.render('home',{
        products
    })
})

app.get('/create/new',(req,res)=>{
    res.render('create')
})

app.get('/receive', (req,res)=>{
    res.render('receive')
})

app.get('/send', (req,res)=>{
    res.render('send')
})

app.get('/show', (req,res)=>{
    res.render('show')
})

app.get('/remove', (req,res)=>{
    res.render('remove')
})

app.post('/create/store',(req,res)=>{
    let image = req.files.image
    image.mv(path.resolve(__dirname,'public/assets/img',image.name),async (error)=>{
        await Product.create({
            ...req.body,
            image: '/assets/img/' + image.name
        })
        res.redirect('/')
    })
})

app.post('/receive/:code',async(req,res)=>{
    const update = await Product.findOneAndUpdate({
        code: req.body.code
    },{
        $inc: {quantite: + req.body.quantite}
    })
    res.redirect('/')
})

app.post('/send/:code',async(req,res)=>{
    const update = await Product.findOneAndUpdate({
        code: req.body.code
    },{
        $inc: {quantite: - req.body.quantite}
    })
    res.redirect('/')
})