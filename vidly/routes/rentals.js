import express from 'express'
import { validateRental, Rental } from '../models/rental.js'
import { Customer } from '../models/customer.js';
import { Movie } from '../models/movie.js';
import mongoose from 'mongoose';

// import Fawn from 'fawn'
// import fawn from 'fawn';

// Fawn.init(mongoose);


const router = express.Router();

router.get('/', async (req, res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);   
})

router.post('/', async (req, res)=>{
    const {error} = validateRental(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Customer is not found!');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("Movie is not found! ");

    if(Movie.numberInStock === 0 ) res.status(400).send('Movie not in stock!')

    const rental = new Rental({
        customer:{
            _id : customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        // new Fawn.Task()
        // .save('rentals', rental)
        // .update('movies', {_id: movie._id},{
        //     $inc:{numberInStock: -1}
        // })
        // .run();             

        rental = await rental.save();
        movie.numberInStock--;
        movie.save();
        console.log(rental);
        res.send(rental);

    } catch (error) {
        res.status(500).send("Something failed!")
    }


})


export {router as rentals};