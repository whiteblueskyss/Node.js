import express from 'express'

const home = express.Router();

home.get('/', (req, res) => {
    res.send("Hello Courses!");
});


export default home;