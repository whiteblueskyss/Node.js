import mongoose, { get } from "mongoose";

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(`Something went wrong.. ${err}`)); 


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength : 5,
        maxlength: 255
        // match : /pattern/
    },
    category:{
        type:String,
        required: true,
        enum: ['web', 'mobile', 'blockchain']
    },
    author: String,
    // tags: [String],
    //custom validator.
    // tags : {
    //     type: Array,
    //     validate: {
    //         validator: function(v) {
    //             return v.length>0;
    //         },
    //         message: 'A course should have at least one tag.'
    //     }
    // },

    tags : {
        type: Array,
        isAsync: true,
        validate: {
            validator: function(v) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const result = v.length > 0;
                        resolve(result);
                    }, 2000);
                });
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {type: Date, default: Date.now()},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function (){ // arrow function won't work here because arrow function dosn't have this keyword.
            return this.isPublished;
        }
    }
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {    
    const course = new Course({
        // name : 'Reactjs Course',
        author: 'Selim',
        category: 'blockchain',
        tags: [],
        isPublished: true,
        // price : 15
    })

    try{
        const result = await course.save();
        console.log(result);   
    }
    catch(err){
        for(let field in err.errors){
            console.log(err.errors[field].message);
        }
    }

}

createCourse();

async function getCourse() {

    // eq equal
    // ne not equal
    // gt greater than
    // gte 
    // lt less than
    // lte 
    // in for multiple values. like (price : { $int: [10, 20, 30]})
    // nin not in
    /* let assuem we have a price property
        find(price : 10 (price 10 will displayed))
        find(price: {$gte:100, $lte:200} (100<=x<=200))
    */
    // logical operation- or , and 
    // find().or([name: "Selim", isPublished: true])

    //reguler expression:
    /*
        .find({author: /^Selim/}) starts with selim
        .find({author: /Selim$/}) ends with selim
        .find({author: /^Selim/i}) starts with selim
        .find({author: /.*Selim.* /}) contain selim

        if wanna case insensitive then add an i after /
        
    */

    // const courses = await Course.find();

    //for pagination
    const pageNumber = 2;
    const pageSize = 10;
    
    const courses = await Course.find({ author: 'Selim', isPublished: true })
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .sort({ name: 1 }) // 1 for ascending, -1 for descending order.
        // .select({ name: 1, tag: 1 })
        .countDocuments();
    console.log(courses);
}

// getCourse();

async function updateCourse(id) {
    //update by query

    // const course = await Course.findById(id);
    // if(!course) return;

    // course.isPublished = false;
    // course.author = "Another author";
    // const result = await course.save();

    //direct update

    const result = await Course.updateMany({_id : id},
        {
            $set:{
                author: 'MY name',
                isPublished: true
            }
        }
    );
    
    console.log(result);


}

// updateCourse("67a083add93a333f980e39f7");


async function removeCourse(id) {
    const result  = await Course.deleteOne({_id : id})// you can give query also inside the curly brackets.

    console.log(result); 
}

// removeCourse("67a083add93a333f980e39f7");
