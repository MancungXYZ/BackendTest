const Book = require('../model/Book')
const router = require('express').Router()

/**
 * @swagger
 * /api/book/addbook:
 *   post:
 *     summary: Menambahkan buku baru
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: string
 *             required:
 *               - code
 *               - title
 *               - author
 *               - stock
 *     responses:
 *       '201':
 *         description: Buku berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 stock:
 *                   type: number
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
router.post("/addbook", async (req, res) => {
    const newBook = new Book({
        code: req.body.code,
        title: req.body.title,
        author: req.body.author,
        stock: req.body.stock
    })

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook)
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

/**
 * @swagger
 * path:
 * /api/book/getbook:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       201:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               code:
 *                type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: number
 */
router.get("/getbook", async (req, res) => {
    try {
        const cariBuku = await Book.find({
            stock: {
                $gt: 0
            }
        })
        res.status(200).json(cariBuku)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router