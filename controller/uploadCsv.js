const multer=require('multer')
const fs=require('fs')
const csv=require('fast-csv')
const path=require('path')
const db=require('../config/mysql')


//setting up multer
var storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,path.join(__dirname,'../upload/csv'))
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+'-'+Date.now()+'.csv')
    }
})
var upload=multer({storage:storage})

// --------------------- movie csv upload -----------------------
module.exports.uploadMovieDetails=(req,resp)=>{
    upload.single('movie_csv')(req,resp,(error)=>{
        if(error){
            console.log('error in uploading csv',error)
            return
        }
        console.log(req.file)
        let msg=uploadCSVToDB(req.file.path,req.file.fieldname)
        return resp.status(200).json({
            message:msg
        })
    })

}

// ------------------- rating csv upload ------------------------
module.exports.uploadRating=(req,resp)=>{
    upload.single('rating_csv')(req,resp,(error)=>{
        if(error){
            console.log('error in uploading csv',error)
            return
        }
        console.log(req.file)
        let msg=uploadCSVToDB(req.file.path,req.file.fieldname)
        return resp.status(200).json({message:msg})

    })

}




// --------------function that handle db insertion -----------------------
function uploadCSVToDB(file_path,feildname){
    let stream=fs.createReadStream(file_path);
    let csv_data=[]
    let csvStream=csv.parse()
    .on('data',(data)=>{
        csv_data.push(data)
    })
    .on('end',async()=>{
        //removing header of data
        csv_data.shift()
        console.log(csv_data)
        let query=(feildname=='movie_csv')?'insert into movies (tconst,titleType,primaryTitle,runtimeMinutes,genres) values ?':'insert into ratings (tconst,averageRating,numVotes) values ?'
        // console.log(query);
        try {
            let data=await db.query(query,[csv_data])
            if(data){
                console.log('saved successfully')
            }
            
        } catch (error) {
            console.log('error in saving data to db');
            return error;
            
        }
        //this will delete the file 
        fs.unlinkSync(file_path)
    })
    stream.pipe(csvStream)
    return 'sucess'



}