const Location = require("../models/location_model");
const Item = require("../models/item_model");
const mongoose = require("mongoose");

//add location
const add_location = async (req, res) => {
    //extract product details from user input
    const { location_name } = req.body;

    try {
        const location = await Location.create(
            {
                location_name
            }
        );
        res.status(200).json({ message: `${location_name} has been added as one of the locations` })
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//adding existing items to a specific location
const add_item_to_location = async (req, res) => {

    //extract location id
    const { id } = req.params;

    //extract item details to be added
    const { item_name, brand, quantity } = req.body;

    try {
        const location = await Location.findById(id);
        const item = await Item.findOne({ item_name, brand }); //findOne is used to find a document based from the condition
        if (!location) {
            return res.status(500).json({ message: "Location not found" });
        } else if (!item) {
            return res.status(500).json({ error: "Item not found" });
        }

        //extracting item code based from item name and brand using the item variable from the imported Item data model
        const item_code = item.item_code;

        //exisiting_item is the item inside a location. this is to check whether an item is already registered in a location using the item_code of the Item data model
        //.find : search for a specific element in an array based on a condition.
        //items parameter represents the items within a location
        const existing_item = location.items.find((items) => items.item_code === item_code);
        if (existing_item) {
            
            existing_item.quantity += quantity;
            await location.save();

            return res.status(200).json({ message: `${location.location_name}: ${quantity} ${item.item_name} has been added. Total Quantity: ${existing_item.quantity}` });

        } 
        else if (!existing_item) {
           
            location.items.push({ item_code: item_code, quantity: quantity });
            await location.save();

            return res.status(200).json({ message: `${quantity} ${item.item_name} has been added in ${location.location_name}` });

        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}


//grab all items of a location
const read_all_items = async (req, res) => {

    //extract id of location
    const { id } = req.params;

    try {
        const location = await Location.findById(id);
        const items = location.items;

        return res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}


//grab an item of a location
const read_one_item = async (req, res) => {

    //extract id of location
    const { id } = req.params;

    try {
        //extract the location
        const location = await Location.findById(id);

        //extract item details from user input
        const { item_name, brand, quantity } = req.body;

        //grab the document that satisfies the condition
        const item = await Item.findOne({ item_name, brand });

        try {

            //extract item code
            const {item_code} = item;

            //check whether the item is in the location
            const existing_item = location.items.find((items) => items.item_code === item_code);
            if(!existing_item){
                return res.status(400).json({ error: `${location.location_name}: Item not found` })
            }

            const {item_name, brand} = item;
            const {quantity} = existing_item;

            return res.status(200).json({item_name, brand, quantity, item_code});

        }
        catch (error) {
            res.status(400).json({ error: `Item not registered` });
        }

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    ;

}

module.exports = { add_location, add_item_to_location, read_all_items, read_one_item };