const db=require('../config/mysql')

// ------------------ top 10 longest duration movie --------------------
module.exports.longestMovie=(req,resp)=>{
   
        db.query('select tconst,primaryTitle,runtimeMinutes,genres from movies order by runtimeMinutes desc limit 10',(error,response)=>{
            if(error)
            {
                return resp.status(500).json({message:'internal server error',error:error})
            }
            return resp.status(200).json({message:'sucess',data:response})
        })
   
    
    
}

// ---------------------------- add new movie -------------------------------------
module.exports.add_movie=(req,resp)=>{
    //then save in movies table
    if(checkvalid(req.body.tconst) 
    && checkvalid(req.body.titleType) 
    && checkvalid(req.body.primaryTitle) 
    && checkvalid(req.body.runtimeMinutes)
    && checkvalid(req.body.genres)){
        db.query('insert into movies values (?,?,?,?,?)',[req.body.tconst,req.body.titleType,req.body.primaryTitle,req.body.runtimeMinutes,req.body.genres],
        (error,data)=>{
            if(error){
                return resp.status(500).json({
                    message:'error in saving to db'
                })
            }
            return resp.status(200).json({
                message:'saved to db',
                data:data
            })

        })

    }
}

// --------------------add new rating ---------------------
module.exports.add_rating=(req,resp)=>{
    //save in ratings db
    if(checkvalid(req.body.tconst) 
    && checkvalid(req.body.averageRating) 
    && checkvalid(req.body.numVotes)){
        db.query('insert into ratings values (?,?,?)',[req.body.tconst,req.body.averageRating,req.body.numVotes],
        (error,data)=>{
            if(error){
                resp.status(500).json({
                    message:'error in saving to db'
                })
            }
            return resp.status(200).json({
                message:'saved to db',
                data:data
            })
            
        })

    }


}

//----------- check validation------------
function checkvalid(item){
    if(item!='' && item!=undefined && item!=null){
        return true;
    }
    return false;
}



//----------- top rated movie --------------
module.exports.top_rated_movie=(req,resp)=>{
    db.query('select mov.tconst,mov.primaryTitle,mov.genres,rat.averageRating from movies mov left join ratings rat on rat.tconst=mov.tconst where rat.averageRating>6.0 order by rat.averageRating desc',
    (error,data)=>{
        if(error){
            return resp.status(500).json({message:'internal server error'})
        }
        return resp.status(200).json({
            message:'sucess',
            data:data
        })

    })

}