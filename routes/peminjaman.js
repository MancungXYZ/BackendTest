const Peminjaman = require('../model/Peminjaman')
const Book = require('../model/Book')
const User = require('../model/User')
const moment = require('moment')
const router = require('express').Router()

/**
 * @swagger
 * tags:
 *   name: Peminjaman
 *   description: API untuk manajemen peminjaman buku
 */


//tanggal hari ini
moment.locale('id')
const hariIni = new Date()
const now = moment(hariIni).format('DD MMMM YYYY')

//random id transaksi
const random = Math.floor(Math.random() * 101);
const transaksi = "PIN"+random;

//tambah pinjaman buku baru
/**
 * @swagger
 * /api/pinjam/addpinjaman:
 *   post:
 *     summary: Menambahkan data peminjaman buku
 *     tags: [Peminjaman]
 *     description: Menambahkan data peminjaman buku berdasarkan kode buku dan kode anggota.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                type: string
 *               kodeBuku:
 *                 type: string
 *             required:
 *               - code
 *               - kodeBuku
 *     responses:
 *       201:
 *         description: Data peminjaman berhasil disimpan
 *       400:
 *         description: Kesalahan input data
 *       403:
 *         description: Anggota tidak boleh meminjam lebih dari 2 buku / Buku telah habis terpinjam / Pengguna dalam masa hukuman
 *       500:
 *         description: Terjadi kesalahan server
 */
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

        //hitung buku yang telah di pinjam
        // console.log(cariUser.borrowedBook.length)
        if (cariUser.borrowedBook.length >= 2) {
            return res.send("Anggota tidak boleh meminjam lebih dari 2 buku")
        } 

        //jika buku sudah dipinjam stock = 0 mengirimkan respon
        if (cariBuku.stock === 0) {
            return res.send("Mohon maaf buku telah di habis terpinjam")
        } else {
            //jika pelanggan melanggar dan masa hukuman belum selesai kirimkan respon
            if (cariUser.finalty === "true") {
                return res.send("Mohon maaf pengguna pernah melanggar peraturan, tidak dapat melakukan peminjaman selama 3 hari")
            } else {
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
        }
        
        // console.log(cariUser)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

module.exports = router