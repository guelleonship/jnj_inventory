const Item = require("../models/item_model");
const mongoose = require("mongoose");

const add_product = async (req, res) => {
    //extract product details from user input
    const { item_name, brand } = req.body;

    try {

        //check if the inputted new item is already existing
        const existing_item = await Item.findOne({ item_name, brand });
        if (existing_item) {
            return res.status(400).json({ error: `Item is already existing`, item_code: `${existing_item.item_code}` })
        }

        const item = await Item.create(
            {
                item_name,
                brand
            }
        );

        res.status(200).json({ message: `Product ${item_name} has been added`, item_code:`${item.item_code}` })

    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { add_product }