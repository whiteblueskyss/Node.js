import express from "express";
import { User } from "../models/user.js";
import _ from 'lodash'
import bcrypt from 'bcrypt'
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from 'config'

const router = express.Router();

function validateLogin(req){
    const schema = Joi.object({
        email:Joi.string().min(5).max(50).required(),
        password:Joi.string().min(5).max(255).required()
    })

    const{ error } = schema.validate(req);
    return error;
}



router.post('/', async (req, res) => {
    const  error  = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password!');

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if(!isValid) return res.status(400).send("Invalid user or password!");

    const token = user.generateAuthToken();
    
    res.send(token);

});


export { router as auth };
