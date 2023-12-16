const {add_item, grab_item, update_item, delete_item} = require("../controllers/item_controller");

const router = require("express").Router();

//define endpoint for adding an item
router.post("/", add_item);

//define endpoint for grabbing all items
router.get("/", grab_item);

//define endpoint for updating an item
router.patch("/", update_item);

//define endpoint for deleting an item
router.delete("/", delete_item);

module.exports = router;