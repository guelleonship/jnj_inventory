const mongoose = require('mongoose');

const item_schema = new mongoose.Schema(
    {
        item_name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number },
    }, { timestamps: true }
)

//exporting the model
module.exports = mongoose.model('Item', item_schema);