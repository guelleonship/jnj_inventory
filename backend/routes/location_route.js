const 
{ 
    add_location,
    add_item_to_location,
    read_all_items,
    read_one_item
} = require("../controllers/location_controller");

const router = require("express").Router()

//define endpoint for adding a location
router.post("/", add_location);

//define endpoint for adding an item to a specific location
router.patch("/:id", add_item_to_location);

//define endpoint for reading all items of a specific location
router.get("/:id", read_all_items)

//define endpoint for reading all items of a specific location
router.get("/:id/search_item", read_one_item)

module.exports = router;