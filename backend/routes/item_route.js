const {add_item, grab_item, update_item} = require("../controllers/item_controller");

const router = require("express").Router();

//define endpoint for adding an item
router.post("/", add_item);

//define endpoint for grabbing all items
router.get("/", grab_item);

//define endpoint for updating an item
router.patch("/update", update_item);

module.exports = router;