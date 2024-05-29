const mongoose = require('mongoose')
const {Author} = require('../Model/author')

mongoose.connect('mongodb://localhost/playground').then((result) => {
    console.log('suc');
}).catch((err) => {
    console.log(err);
});

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
})

const Course = mongoose.model('Course2', mongoose.Schema({
    name: String,
    authors: [authorSchema]
}))

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    })

    const result = await course.save()
    console.log(result);
}

async function listCourse() {
    const courses = await Course
        .find() 
    
    console.log(courses);
}

// createCourse('PHP Course', [
//     new Author({ name: 'Jay'}),
//     new Author({ name: 'raj'}),
//     new Author({ name: 'meet'})
// ])

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId)
    course.authors.push(author)
    course.save()
}
// addAuthor('65f2b1c5ad10ec44b0c3112e', new Author({name: 'Amy'}))

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId)
    // const author = await course.authors.id(authorId)
    // await author.deleteOne()
    course.authors.pull(authorId); // This will remove the author from the authors array
    course.save()
}
// removeAuthor('65f2b1c5ad10ec44b0c3112e','65f2b1c5ad10ec44b0c3112d')