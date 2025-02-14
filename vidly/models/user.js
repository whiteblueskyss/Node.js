import mongoose from "mongoose";
import Joi from "joi"
import _ from "lodash";
import jwt from 'jsonwebtoken'
import config from 'config'

const userSchema = new mongoose.Schema({
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
        maxlength: 255,
    },
    isAdmin : {
        type: Boolean,
        required: true  
    }
})


userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id : this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}


const User = mongoose.model('user', userSchema);


function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(50).required(),
        password:Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean().required()
    })

    const{ error } = schema.validate(user);
    return error;
}


export{User, validateUser};