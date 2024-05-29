const mongoose = require('mongoose')
const {Course,Author} = require('../Model/author')

mongoose.connect('mongodb://localhost/playground').then((result) => {
    console.log('suc');
}).catch((err) => {
    console.log(err);
});

async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    })

    const result = await author.save()
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    })

    const result = await course.save()
    console.log(result);
}

async function listCourse() {
    const courses = await Course
        .find() 
        .populate('author','name -_id')
        .select('name author')
    
    console.log(courses);
}

// createAuthor('yash','react','yash.com')

// createCourse('react course', '65e9880b27c81ae6985e2b31')

listCourse()