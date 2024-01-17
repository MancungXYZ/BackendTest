const Book = require('../model/Book')
const User = require('../model/User')
const Pengembalian = require('../model/Pengembalian')
const Peminjaman = require('../model/Peminjaman')
const moment = require('moment')
const router = require('express').Router()

/**
 * @swagger
 * tags:
 *   name: Pengembalian
 *   description: API for managing book returns
 */

/**
 * @swagger
 * /api/pengembalian/addpengembalian:
 *   post:
 *     summary: Menambahkan data pengembalian buku
 *     tags: [Pengembalian]
 *     description: Menambahkan data pengembalian buku berdasarkan kode buku dan kode anggota.
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
 *         description: Data pengembalian berhasil disimpan
 *         content:
 *           application/json:
 *             example:
 *               message: Data Pengembalian buku berhasil disimpan
 *       400:
 *         description: Nomor anggota tidak ditemukan/terdaftar
 *         content:
 *           application/json:
 *             example:
 *               error: Nomor anggota tidak ditemukan/terdaftar
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             example:
 *               error: Terjadi kesalahan server
 */

//tanggal hari ini
moment.locale('id')
const hariIni = moment(new Date()).format("DD MMMM YYYY")

//random id transaksi
const random = Math.floor(Math.random() * 101);
const transaksi = "PENGEM"+random;

router.post('/addpengembalian', async (req, res) => {
    const kodeBuku = req.body.kodeBuku
    const code = req.body.code

    const newPengembalian = new Pengembalian({
        transaksi: transaksi,
        code: code,
        kodeBuku: kodeBuku,
        tglPengembalian: hariIni
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
        
        const cariPeminjaman = await Peminjaman.findOne({
            "code": code
        })

        // apabila lebih 7 hari finalty
        const start = moment(cariPeminjaman.tglPinjam, 'DD MMMM YYYY')
        const end = moment()

        const waktu = end.diff(start, 'days')

        if (cariPeminjaman === null) {
            return res.send("Maaf nomor anggota tidak ditemukan/terdaftar")
        } else {
            
            if (waktu >= 7) {
                const updateFinalty = await User.updateOne({code: code},
                    {
                        $set: {finalty: "true"}
                    },
                    {
                        $pull: {borrowedBook: kodeBuku}
                    }   
                )
                //update/perbarui stock buku setelah peminjaman
                const updateStock = await Book.updateOne({ code: kodeBuku },
                    {
                        $set: {
                            stock: 1
                        }
                    })
                    
                //keluarkan buku yang di kembalikan pengguna ke dalam array
                const updatePinjaman = await User.updateOne({code: code},
                    {
                        $pull: {borrowedBook: kodeBuku}
                    }
                        
                    )
                //simpan data peminjaman kedalam database
                const savedPengembalian = await newPengembalian.save();
                        
                //kirimkan respon penyimpanan dari database
                return res.status(201).json(`Data Pengembalian buku berhasil disimpan dengan keterlambatan pengguna tidak dapat melakukan peminjaman selama 3 hari`)

            } else {
                //update/perbarui stock buku setelah peminjaman
                const updateStock = await Book.updateOne({ code: kodeBuku },
                    {
                        $set: {
                            stock: cariBuku.stock + 1
                        }
                    })
                    
                //keluarkan buku yang di kembalikan pengguna ke dalam array
                const updatePinjaman = await User.updateOne({code: code},
                    {
                        $pull: {borrowedBook: kodeBuku}
                    }
                        
                    )
                //simpan data peminjaman kedalam database
                const savedPengembalian = await newPengembalian.save();
                        
                //kirimkan respon penyimpanan dari database
                return res.status(201).json("Data Pengembalian buku berhasil disimpan")
            }

        }
        //  console.log(cariPeminjaman.tglPinjam)
    } catch (error) {
        console.log(error)
        res.send("Terjadi kesalahan")
    }
})

module.exports = router
