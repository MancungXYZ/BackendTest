const Peminjaman = require('../model/Peminjaman')
const Book = require('../model/Book')
const User = require('../model/User')
const moment = require('moment')
const router = require('express').Router()

//tanggal hari ini
moment.locale('id')
const hariIni = new Date()
const now = moment(hariIni).format('DD MMMM YYYY')

//random id transaksi
const random = Math.floor(Math.random() * 101);
const transaksi = "PIN"+random;

//tambah pinjaman buku baru
router.post("/addpinjaman", async (req, res) => {
    kodeBuku = req.body.kodeBuku
    code = req.body.code
    const newPinjaman = new Peminjaman({
        transaksi: transaksi,
        code: code,
        kodeBuku: kodeBuku,
        tglPinjam: now
    })

    try {
        //cari buku dengan kode yang dimasukkan pengguna
        const cariBuku = await Book.findOne({
            "code": kodeBuku
        })
        //cari anggota dengan kode yang dimasukkan pengguna
        const cariUser = await User.findOne({
            "code": code
        })

        //jika buku sudah dipinjam stock = 0 mengirimkan respon
        if (cariBuku.stock === 0) {
            return res.send("Mohon maaf buku telah di habis terpinjam")
        } else {
            //jika pelanggan melanggar dan masa hukuman belum selesai kirimkan respon
            if (cariUser.finalty === true) {
                return res.send("Mohon maaf pengguna pernah melanggar peraturan, tidak dapat melakukan peminjaman selama 3 hari")
            }
            //masukkan buku apa saja yang dipinjam pengguna
            const updatePinjaman = await User.updateOne({code: code},
                {
                    $push: {borrowedBook: kodeBuku}
                }
                
            )
            //update/perbarui stock buku setelah peminjaman
            const updateStock = await Book.updateOne({ code: kodeBuku },
                {
                  $set: {
                    stock: cariBuku.stock - 1
                  }
                })
            //simpan data peminjaman kedalam database
            const savedPinjaman = await newPinjaman.save();

            //kirimkan respon penyimpanan dari database
            res.status(201).json("Data Pinjaman berhasil disimpan")
        }
        
        // console.log(cariUser)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

module.exports = router