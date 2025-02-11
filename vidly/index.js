import express from 'express';
import { genres } from './routes/genres.js';
import mongoose from 'mongoose';
import { customers } from './routes/customers.js';
import { movies } from './routes/movies.js';
import { rentals } from './routes/rentals.js'; 
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
import { users } from './routes/users.js';

Joi.objectId = JoiObjectId(Joi);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(`Something went wrong.. ${err}`)); 

const app = express();

app.use(express.json());

app.use('/api/genres', genres); 
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.....`);
});