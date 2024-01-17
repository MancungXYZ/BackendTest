const User = require('../model/User');
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /api/user/adduser:
 *   post:
 *     summary: Menambahkan pengguna baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                type: string
 *               name:
 *                 type: string
 *             required:
 *               - code
 *               - name
 *     responses:
 *       '201':
 *         description: Pengguna berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 name:
 *                   type: string
 *       '500':
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/adduser", async (req, res) => {
    const newUser = new User({
        code: req.body.code,
        name: req.body.name
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
        console.log(error);
    }
});

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Mengambil semua data anggota
 *     tags: [Users]
 *     description: Mengembalikan semua data anggota yang tersedia.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Data anggota berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               code:
 *                type: string
 *               name:
 *                 type: string
 *       500:
 *         description: Terjadi kesalahan server
 *         content:
 *           application/json:
 *             example:
 *               error: "Terjadi kesalahan server"
 */
router.get("/", async (req, res) => {
    try {
        const cariPengguna = await User.find();
        res.status(200).json(cariPengguna);
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
});

module.exports = router;