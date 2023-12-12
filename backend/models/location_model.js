const mongoose = require("mongoose");

const location_schema = new mongoose.Schema({
    location_name: {type:String, required:true, unique:true},
    items: [
        {
            item_code: {type:String, ref:'Item'},
            quantity: {type:Number, default:0}
        }
    ]
});

module.exports = mongoose.model('Location', location_schema);