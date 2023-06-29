const mysql=require('mysql')
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'movies'
})

db.connect((error)=>{
    if(error){
        console.log('error in connecting to db \n',error)
        return
    }
    console.log('------------  connected to database -------------')

})

module.exports=db;
