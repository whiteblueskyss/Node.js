import mongoose from "mongoose";
import Joi from "joi"


const User = mongoose.model('user', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
}));


function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required(),
        password:Joi.string().min(5).max(255).required()
    })

    const{ error } = schema.validate(user);
    return error;
}


export{User, validateUser};