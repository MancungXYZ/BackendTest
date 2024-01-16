const Book = require('../model/Book')
const router = require('express').Router()

router.post("/addbook", async (req, res) => {
    const newBook = new Book({
        code: req.body.code,
        title: req.body.title,
        author: req.body.author,
        stock: req.body.stock
    })

    try {
        const savedBook = await newBook.save();
        res.status(201).json(console.log(savedBook))
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const cariBuku = await Book.find()
        res.status(200).json(cariBuku)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router