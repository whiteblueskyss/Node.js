import express from "express";
import { Customer, validateCustomer } from "../models/customer.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) return res.status(404).send("Customer is not found!");

    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id, 
        {
            name: req.body.name,
            isGold: req.body.isGold === "true",
            phone: req.body.phone
        },
        { new: true }
    );

    if (!customer) return res.status(404).send("Customer is not found!");
        
    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold === "true",
        phone: req.body.phone
    });

    try {
        const result = await customer.save();
        console.log(result);
    } catch (err) {
        for (let field in err.errors) {
            console.log(err.errors[field].message);
        }
    }

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) return res.status(404).send("Customer is not found!");
    
    res.send(customer);
});

export { router as customers };