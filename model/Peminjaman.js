const mongoose = require("mongoose")

const peminjamanSchema = new mongoose.Schema({
    transaksi: { type: String, required:true},
    code: { type: String, required:true},
    kodeBuku: {type: String, required:true},
    tglPinjam: {type: String},
}, {timestamps: true},
);

module.exports = mongoose.model("Pinjaman", peminjamanSchema)