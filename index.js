const { error } = require('console')
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user')
const bookRoute = require('./routes/book')
const pinjamRoute = require('./routes/peminjaman')
const pengembalianRoute = require('./routes/pengembalian')
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express()
const port = 3000

dotenv.config()


app.use(express.json()) //mengizinkan menggunakan json
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json())

// Middleware untuk menangani tipe konten
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const conn = mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Mongodb berhasil terkoneksi")).catch((error) => console.log(error))

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EIGEN Books Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple Book API application made with Express and documented with Swagger",
      contact: {
        name: "Reihan Wiyanda",
        url: "mancungcode.my.id",
        email: "reihanwiyanda@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use(
  "/api-docs",
 swaggerUI.serve,
 swaggerUI.setup(specs)
);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/api/user", userRoute) //handle pengguna
app.use("/api/book", bookRoute) //handle buku
app.use("/api/pinjam", pinjamRoute) //handle pinjaman buku
app.use("/api/pengembalian", pengembalianRoute ) //handle pengembalian buku

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})