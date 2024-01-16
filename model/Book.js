const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    code: { type: String, required:true, unique:true},
    title: {type: String, required:true},
    author: {type: String},
    stock: {type: Number, default: 1}
}, {timestamps: true},
);

module.exports = mongoose.model("Book", BookSchema)