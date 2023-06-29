const express=require('express')
const uploadCsvController=require('../controller/uploadCsv')
const movieController=require('../controller/movies')
const router=express.Router()
router.get('/',(req,resp)=>{
    resp.status(200).json({message:'hello from server'})
})

router.get('/v1/longest-duration-movies',movieController.longestMovie)
router.get('/v1/top-rated-movies',movieController.top_rated_movie)

//add new movie and new rating
router.post('/v1/new-movie',movieController.add_movie)
router.post('/v1/new-rating',movieController.add_rating)

//upload excel of movie and ratings
router.post('/upload/csv/movie',uploadCsvController.uploadMovieDetails)
router.post('/upload/csv/rating',uploadCsvController.uploadRating)


module.exports=router