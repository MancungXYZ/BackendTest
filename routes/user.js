const User = require('../model/User')
const router = require('express').Router()

//tambah anggota baru
router.post("/adduser", async (req, res) => {
    const newUser = new User({
        code: req.body.code,
        name: req.body.name
    })

    try {
        const savedUser = await newUser.save();
        res.status(201).json(console.log(savedUser))
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

//ambil semua data anggota
router.get("/", async (req, res) => {
    try {
        const cariPengguna = await User.find()
        res.status(200).json(cariPengguna)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router