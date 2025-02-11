import mongoose from "mongoose";
import Joi from "joi";

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    isGold:{
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true
    }
}))


function validateCustomer(customer){
const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().required() 
})

const{ error } = schema.validate(customer);
return error;
}

export{Customer, validateCustomer};