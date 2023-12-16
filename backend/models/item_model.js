const mongoose = require('mongoose');

const item_schema = new mongoose.Schema(
    {
        item_name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number },
        item_code: { type: String, unique:true }
    }, { timestamps: true }
)

//middleware to automatically generate item code
//we are using an anonymous function as arrow function has issues using the "this" keyword
item_schema.pre('save', function (next) {
    
    //getting the time string
    const current_date = new Date();
    const timezone = { timeZone: 'Asia/Manila' };

    //notes below
    const time_code = current_date.toLocaleString('en-US', { ...timezone, hour: '2-digit', minute: '2-digit', second: '2-digit',hour12: false }).replace(/[^0-9]/g, '') + current_date.getMilliseconds().toLocaleString();
    const date_code = current_date.toLocaleString('en-US', { ...timezone, month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/[^0-9]/g, '');

    this.item_code = `${date_code.slice(0, 4)}${date_code.substring(6)}${time_code}`;
    next();
}
);

//exporting the model
module.exports = mongoose.model('Item', item_schema);



//current_date : This is a JavaScript Date object representing the current date and time.

//.toLocaleString : This method converts the date and time to a string representation using the specified options.

//string representation: refers to the way in which a particular data type or object is expressed as a sequence of characters (i.e., a string). For example, when working with dates and times, the string representation might include the day, month, year, and time in a specific format.

//{ ...timezone, hour: '2-digit' ...} : This is an options object passed to toLocaleString. It specifies additional formatting options, including the time zone, and sets the format for the hour, minute, and second to '2-digit' (ensuring two digits for each component).

//hour12:false : uses military time

//numeric : means representing the value as a number

//.replace(...) : This is a string method that searches for a specified pattern in the string and replaces it with another string or removes it.

///[^0-9]/g : This is a regular expression pattern that matches any character that is not a digit (0-9). The ^ inside the square brackets negates the character class, and 0-9 represents any digit.

//'' : This is the replacement string, effectively removing all non-digit characters from the resulting string.