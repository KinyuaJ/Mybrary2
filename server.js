if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require ('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT  || 3000;

const indexRouter = require('./routes/index')
// const { log } = require('console')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser:true
})
const db = mongoose.connection
db.on('error', error =>console.error(error))
db.once('open', ()=> console.log('Connected to moongoose'))


app.use('/', indexRouter)










app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})