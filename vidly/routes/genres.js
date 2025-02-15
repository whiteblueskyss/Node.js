import express from "express"
import { Genre, validateGenre } from "../models/genre.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
import asyncHandler from "../middlewares/async.js";

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}))

router.get('/:id', async (req, res)=>{
    const genre = await Genre.findById(req.params.id);
    
    if(!genre) return res.status(404).send("Genre is not found !")

    res.send(genre);
})

router.put('/:id', async (req, res)=>{
    const error = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(
        req.params.id, 
        {name: req.body.name},
        {new: true}
    );

    if(!genre) return res.status(404).send("Genre is not found !")
        
    res.send(genre);
})

router.post('/', auth, asyncHandler(async (req, res)=>{
    const error = validateGenre(req.body);    
   
    if(error) return res.status(400).send(error.details[0].message);
   
    const genre = new Genre({
        name: req.body.name
    })

    const result = await genre.save();
    console.log(result);

    res.send(genre);

}))

router.delete('/:id', [auth, admin], async(req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if(!genre) return res.status(404).send("Genre is not found !")
    
    res.send(genre);
})

export {router as genres};


