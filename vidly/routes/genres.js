import express from "express"
import { Genre, validateGenre } from "../models/genre.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";


const router = express.Router();


router.get('/', async (req, res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

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

router.post('/', auth, async (req, res)=>{
    const error = validateGenre(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    })

    try {
        const result = await genre.save();
        console.log(result);
    } catch (err) {
        for(let field in err.errors){
            console.log(err.errors[field].message);
        }
    }

    res.send(genre);

    // let genre = {
    //     name : req.body.name
    // }
    // genres.push(genre);
    // res.send(genre);
})

router.delete('/:id', [auth, admin], async(req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if(!genre) return res.status(404).send("Genre is not found !")
    
    res.send(genre);
})

export {router as genres};


