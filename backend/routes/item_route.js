const {add_product} = require("../controllers/item_controller");

const router = require("express").Router()

//define endpoint for adding an item
router.post("/", add_product);

module.exports = router;