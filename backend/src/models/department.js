const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const departmentsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
});
module.exports = mongoose.model('Department', departmentsSchema);