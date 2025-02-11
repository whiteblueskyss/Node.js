import mongoose from "mongoose";
import Joi from "joi";
import { genreSchema } from "./genre.js";

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min:0,
        max:255
    }

}))

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(5).max(50).required(),
        dailyRentalRate: Joi.number().min(5).max(50).required()
    })

    return schema.validate(movie)
}

export {validateMovie, Movie};