const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let RoleSchema = new mongoose.Schema({

    name: String
});

module.exports = mongoose.model('roles', RoleSchema);