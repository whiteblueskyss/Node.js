import mongoose from "mongoose"
import express from 'express'
import { validateMovie, Movie } from "../models/movie.js" 
import { Genre } from "../models/genre.js";


const router = express.Router();

router.get('/', async (req, res) => {   
    const movies = await Movie.find().sort('name');
    res.send(movies);
})

// router.get('/:id', async (req, res) =>{
//     const movie = await Movie.findById(req.body.prams.id)
// })

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    try {
        await movie.save();
        res.send(movie);
    } catch (err) {
        res.status(500).send('Something went wrong.');
    }
});

export {router as movies};
