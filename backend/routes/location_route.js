const 
{ 
    add_location,
    grab_location,
    add_item_to_location_by_name_and_brand,
    add_item_to_location_by_code,
    read_all_items,
    read_one_item
} = require("../controllers/location_controller");

const router = require("express").Router()

//define endpoint for adding a location
router.post("/", add_location);

//define endpoint for grabbing all locations
router.get("/", grab_location);

//define endpoint for adding an item to a specific location using name and brand
router.patch("/:id/name", add_item_to_location_by_name_and_brand);

//define endpoint for adding an item to a specific location using item code
router.patch("/:id/code", add_item_to_location_by_code);

//define endpoint for reading all items of a specific location
router.get("/:id", read_all_items)

//define endpoint for reading all items of a specific location
router.get("/:id/search_item", read_one_item)

module.exports = router;