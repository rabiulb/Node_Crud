const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ProductSchema = new mongoose.Schema({
   
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true},
},
{
    timestamps: true
});


// Export the model
module.exports = mongoose.model('test', ProductSchema);