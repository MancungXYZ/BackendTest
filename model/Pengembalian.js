const mongoose = require("mongoose")

const pengembalianSchema = new mongoose.Schema({
    transaksi: { type: String, required:true, unique:true},
    code: { type: String, required:true},
    kodeBuku: {type: String, required:true},
    tglPengembalian: {type: String},
}, {timestamps: true},
);

module.exports = mongoose.model("Pengembalian", pengembalianSchema)