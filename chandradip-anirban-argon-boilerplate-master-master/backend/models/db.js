const mongoose = require('mongoose');

/*mongoose.connect("mongodb://localhost:27017/MEANStackDB", (err) => {
    if (!err)
        console.log("MongoDB connection succeeded.");
    else
        console.log("Error in MongoDB connection: " + JSON.stringify(err,undefined,2));
});*/

mongoose.connect("mongodb://apsolutio:apsolutiomongo2018@139.59.40.185:27017/finakya?authSource=finakya", (err) => {
    if (!err)
        console.log("MongoDB connection succeeded.");
    else
        console.log("Error in MongoDB connection: " + JSON.stringify(err,undefined,2));
});

/*mongoose.connect("mongodb+srv://dip:b4gYlS6TAqsSwvoj@cluster0-5dhpn.mongodb.net/merchantdb?retryWrites=true&w=majority", (err) => {
    if (!err)
        console.log("MongoDB connection succeeded.");
    else
        console.log("Error in MongoDB connection: " + JSON.stringify(err,undefined,2));
});*/

require("./user.model");
require("./merchant.js");
// require('./customer.model');
// require('./mutual-advisor.model');
// require('./stock.model');


