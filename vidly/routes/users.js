import express from "express";
import { User, validateUser } from "../models/user.js";
// import { lt } from "lodash";
import _ from 'lodash'
import bcrypt from 'bcrypt'
import config  from 'config'
import jwt from 'jsonwebtoken'
import auth from "../middlewares/auth.js";


const router = express.Router();


router.get('/me', auth, async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})


router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});


router.post('/', async (req, res) => {
    const  error  = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User is already registered!');

    user = new User(_.pick(req.body,['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const result = await user.save();
    console.log(_.pick(result, ['name', 'email']));
    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));

});

export { router as users };
