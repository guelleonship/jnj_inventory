//import routes
const item_route = require("./routes/item_route");
const location_route = require("./routes/location_route");

//import packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//starting the server
app.listen(3000, () => console.log("Listening at port 3000"));

//connect to mongodb
mongoose.connect("mongodb+srv://althanileonida:110798_Bohol@cluster0.snvqjh4.mongodb.net/jnj_inventory?retryWrites=true&w=majority")
.then( () => console.log("DB Connection successful") )
.catch((error) => console.log(error));

//converts json to js object
app.use(express.json());

//define root path for products
app.use('/api/items', item_route);

//define root path for location
app.use('/api/locations', location_route);