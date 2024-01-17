const { error } = require('console')
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user')
const bookRoute = require('./routes/book')
const pinjamRoute = require('./routes/peminjaman')
const pengembalianRoute = require('./routes/pengembalian')
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
const app = express()
const port = 3000

dotenv.config()

app.use(express.static(pathToSwaggerUi))
app.use(express.json()) //mengizinkan menggunakan json
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json())

const conn = mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Mongodb berhasil terkoneksi")).catch((error) => console.log(error))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/user", userRoute) //handle pengguna
app.use("/api/book", bookRoute) //handle buku
app.use("/api/pinjam", pinjamRoute) //handle pinjaman buku
app.use("/api/pengembalian", pengembalianRoute ) //handle pengembalian buku

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})