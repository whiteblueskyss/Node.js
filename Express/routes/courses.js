import express from 'express'
import Joi from 'joi';
const router = express.Router();

let courses = [
    { id: 1, name: "Course1" },
    { id: 2, name: "Course2" },
    { id: 3, name: "Course3" },
    { id: 4, name: "Course4" },
];


router.get('/', (req, res) => {
    res.send(courses);
});

function validation(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(course);
    return error;
}

router.post('/', (req, res) => {
    
    const error = validation(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    let course = courses.find(e => e.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("Course is not found!");
        return;
    }

    const error = validation(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

router.get('/:id', (req, res) => {
    let course = courses.find(e => e.id === parseInt(req.params.id));

    if (!course) {
        res.status(404).send("Course is not found!");
    } else {
        res.send(course);
    }
});

router.get('/:year/:month', (req, res) => {
    res.send(req.query);
});

router.delete('/:id', (req, res) => {
    let course = courses.find(e => e.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("Course is not found!");
        return;
    }

    const courseIndex = courses.indexOf(course);
    courses.splice(courseIndex, 1);

    res.send(course);
});


export default router;