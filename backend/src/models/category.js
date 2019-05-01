const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    department_id : {
        type : Schema.Types.ObjectId,
        ref : 'Department'
    }
});

module.exports = mongoose.model('Category', categorySchema);