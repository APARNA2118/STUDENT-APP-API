const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Student = new Schema({
    student_name: {type: String},
    student_age: {type: String},
    student_dept: {type: String}
});


module.exports= mongoose.model("Student",Student);