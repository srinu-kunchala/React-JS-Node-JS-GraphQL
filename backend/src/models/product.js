const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    price : {
        type : String
    },
    discounted_price : {
        type : String
    },
    image : {
        type : String
    },
    image_2 : {
        type : String
    },
    thumbnail : {
        type : String
    },
    cat_id : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    }
});

module.exports = mongoose.model("Product", ProductSchema);
