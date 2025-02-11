import mongoose from "mongoose";
import Joi from "joi"

const genreSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema);


function validateGenre(genre){
    const schema = Joi.object({
        name:Joi.string().min(4).max(50).required()
    })

    const{ error } = schema.validate(genre);
    return error;
}


export{Genre, validateGenre, genreSchema};