import express from "express";
import { User, validateUser } from "../models/user.js";
// import { lt } from "lodash";
import _ from 'lodash'

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.post('/', async (req, res) => {
    const  error  = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User is already registered!');

    user = new User(_.pick(req.body,['name', 'email', 'password']));

    try {
        const result = await user.save();
        console.log(result);
        res.send(_.pick(user, ['name', 'email']));
    } catch (err) {
        for (let field in err.errors) {
            console.log(err.errors[field].message);
        }
        res.status(500).send("Something went wrong.");
    }
});

export { router as users };
