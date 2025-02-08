import { connect, Schema, model } from 'mongoose';

connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new Schema({
  name: String,
  bio: String,
  website: String
});

const Author = model('Author', authorSchema);

const Course = model('Course', new Schema({
  name: String,
  author: authorSchema
}));


async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

createCourse('Node Course', new Author({ name: 'Mosh' }));