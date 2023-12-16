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

//grab all locations added
const grab_location = async (req, res) => {

    try {
        const locations = await Location.find({}, '_id location_name'); //displaying only the id and the location_name values
        return res.status(200).json({ locations });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

/*
//adding existing items to a specific location using item name and brand name
const add_item_to_location_by_name_and_brand = async (req, res) => {

    //extract item details to be added
    const { location_name, item_name, brand, quantity } = req.body;

    try {
        const location = await Location.findOne({ location_name: location_name });
        const item = await Item.findOne({ item_name, brand }); //findOne is used to find a document based from the condition
        if (!location) {
            return res.status(500).json({ message: "Location not found" });
        } else if (!item) {
            return res.status(500).json({ error: "Item not found" });
        }

        //extracting item code based from item name and brand using the item variable from the imported Item data model
        const item_code = item.item_code;

        //existing_item is the item inside a location. this is to check whether an item is already registered in a location using the item_code of the Item data model
        //.find : search for a specific element in an array based on a condition.
        //items parameter represents the items within a location
        const existing_item = location.items.find((items) => items.item_code === item_code);
        if (existing_item) {

            existing_item.quantity += quantity;
            await location.save();

            return res.status(200).json({ message: `${item.item_name} has been resupplied`, quantity: `${quantity}`, total_quantity: `${existing_item.quantity}`, location: `${location.location_name}` });

        }
        else if (!existing_item) {

            location.items.push({ item_code: item_code, quantity: quantity });
            await location.save();

            return res.status(200).json({ message: `${item.item_name} successfully added`, quantity: `${quantity}`, total_quantity: `${quantity}`, location: `${location.location_name}` });

        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}
*/

//add item to a location using item codes
const add_item_to_location_by_code = async (req, res) => {

    //extract the location and item details to be added
    const { location_name, item_code, quantity } = req.body;

    try {
        const location = await Location.findOne({ location_name: location_name });
        const item = await Item.findOne({ item_code }); //findOne is used to find a document based from the condition
        if (!location) {
            return res.status(500).json({ message: "Location not found" });
        } else if (!item) {
            return res.status(500).json({ error: "Item not found" });
        }


        let existing_item = location.items.find((items) => items.item_code === item_code);
        if (existing_item) {

            existing_item.quantity += quantity;
            await location.save();

            return res.status(200).json({ message: `${item.item_name} has been resupplied`, quantity: `${quantity}`, total_quantity: `${existing_item.quantity}`, location: `${location.location_name}` });

        }
        else if (!existing_item) {

            location.items.push({ item_code: item_code, quantity: quantity }); // making the item_code an object id for referencing
            await location.save();

            return res.status(200).json({ message: `${item.item_name} successfully added`, quantity: `${quantity}`, total_quantity: `${quantity}`, location: `${location.location_name}` });

        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//grab all items of a location
const read_all_items = async (req, res) => {

    //extract id of location
    const { location_name } = req.body;

    try {
        const location = await Location.findOne({ location_name: location_name });
        const items = location.items;

        return res.status(200).json({ items });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

}


//grab an item of a location
const read_one_item = async (req, res) => {

    //extract item details from user input
    const { location_name, item_code } = req.body;

    try {
        //extract the location
        const location = await Location.findOne({ location_name: location_name });

        //grab the document that satisfies the condition
        const item = await Location.findOne({ location_name: location_name, 'items.item_code': item_code });

        try {

            //check whether the item is in the location
            const existing_item = location.items.find((items) => items.item_code === item_code);
            if (!existing_item) {
                return res.status(400).json({ error: `Item not found`, location: `${location.location_name}` })
            }

            const populatedLocation = await Location.findOne({ 'items.item_code': mongoose.Types.ObjectId(item_code) }).populate('items.item_code', 'item_name brand');
            const { quantity } = existing_item;

            return res.status(200).json({ item_code: `${item.item_code}`, item_name: `${populatedLocation.items.item_code.item_name}`, brand: `${populatedLocation.items.item_code.brand}`, quantity: `${quantity}` });

        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    ;

}

module.exports =
{
    add_location,
    grab_location,
    //add_item_to_location_by_name_and_brand,
    add_item_to_location_by_code,
    read_all_items,
    read_one_item
};