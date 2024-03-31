const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false}).then(()=> console.log("Connected succesfully"))
.catch(err=>console.log('error:',err))


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
})
const Course = mongoose.model('Courses', courseSchema);
async function createCourse(){
    try {
const course = new Course({
    name: "Cmp 406",
    author: "Mr J",
    tags: ['Graphics', 'Camera'],
    //since we have a default for date we dont have to specify it
    isPublished: true
});   
const result = await course.save();
console.log(result);
    } catch (error) {
        console.log(error.message)
    }
}

async function getCourses(){
    const pageNum = 2;
    const pageSize = 10;

    try {
    const course = await Course.
    find({author: 'Mr Barka'})
    .skip((pageNum-1) * pageSize).limit(pageSize)
    .sort({name:1})
    .count();
        console.log(course);
    } catch (error) {
        console.log(error.message)
    }
}

// async function updateCourse(id){
//     try {
//         const course = await Course.findById(id);
//     if(!course){
//         return;
//     }
//     course.set({
//         name: 'Bio403',
//         author:"Thompson"
//     })

//  const result = await course.save();
//  console.log(`Updated ${result}`);
//     } 
//     catch (error) {
//         console.log(error.message)
//     }
    
// }

//or 

async function updateCourse(id){
    try {
        const course = await   Course.findByIdAndUpdate(id,{
        $set:{
            name: "Chee",
            author: "Mr Aremu"
        }
    }, {new: true});
    console.log(course)

    } catch (error) {
        console.log(error.message)
    }
 
}
getCourses();



async function deleteCourse(id){
    try {
       const course =  await Course.findByIdAndRemove(id);
console.log(course); 
    } catch (error) {
        console.log(error.message);
    }
}