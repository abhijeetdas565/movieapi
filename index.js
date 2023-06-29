const express=require('express')
const db=require('./config/mysql')
const bodyParser=require('body-parser')
const port=8000
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',require('./router/index'))

app.listen(port,(error)=>{
    if(error){
        console.log(`error in running server : ${error}`)
        return
    }
    console.log(`express is up on port : ${port}`)
})
























