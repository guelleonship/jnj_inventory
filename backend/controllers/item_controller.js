const Item = require("../models/item_model");
const mongoose = require("mongoose");

const add_item = async (req, res) => {
    //extract product details from user input
    const { item_name, brand, price } = req.body;

    try {

        //check if the inputted new item is already existing
        const existing_item = await Item.findOne({ item_name, brand });
        if (existing_item) {
            return res.status(400).json({ error: `Item is already existing`, item_code: `${existing_item.item_code}` })
        }

        const item = await Item.create(
            {
                item_name,
                brand,
                price
            }
        );

       return res.status(200).json({ message: `Product has been added`, item_name: `${item_name}`, price: `${price}`, item_code: `${item.item_code}` });

    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const grab_item = async (req, res) => {

    try {
        const items = await Item.find({}, 'item_code item_name brand'); //specifying teh fields to be displayed
        return res.status(200).json({ items });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//update an item
const update_item = async (req, res) => {

    const { item_code } = req.body;

    try {
        const updated_item = await Item.updateOne(
            { item_code: item_code },
            { $set: { ...req.body } }
        );

        if(updated_item.modifiedCount === 1){
            return res.status(200).json({message: "Product has been updated"});
        } else {
            return res.status(400).json({error: "Updating of product failed"})
        }       
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

//delete an item
const delete_item = async (req,res) => {

    const {item_code} = req.body;
    const item = await Item.findOne({item_code:item_code}, 'item_name brand' );

    try {
        await Item.deleteOne({item_code: item_code});
        return res.status(200).json({message: `Product has been deleted in the system`, product: `${item.item_name}`, brand: `${item.brand}`});
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = { add_item, grab_item, update_item, delete_item};