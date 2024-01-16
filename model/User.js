const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    code: { type: String, required:true, unique:true},
    name: {type: String, required:true},
    finalty: {type: String, default: "false"},
    borrowedBook: {type: Array}
}, {timestamps: true},
);

module.exports = mongoose.model("User", UserSchema)