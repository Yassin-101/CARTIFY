require('dotenv').config()
const express = require('express')
const app = express()
const cors  = require('cors')
const multer = require("multer");

const path = require("path");


app.use(cors())
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const authRoutes = require('./routes/authRoutes')
// const productRoutes = require('./routes/productRoutes')
// const newCollectionRoutes = require('./routes/newCollectionRoutes')
const headerRoutes = require('./routes/headerRoutes')
const newRoutes = require("./routes/NewRoutes")
const selectRoutes = require("./routes/selectRoutes")
const shopRoutes = require("./routes/shopRoutes")

// const adminRoutes = require("./routes/admin");


const responseMiddleware = require('./middlewares/responceMiddleware')

//middleware

app.use(responseMiddleware)


app.use("/api/auth",authRoutes)
// app.use("/api/products",productRoutes)
// app.use("/api/new-collection",newCollectionRoutes)
app.use("/api/header",headerRoutes)
app.use("/api/new-collection",newRoutes)
app.use("/api/selected-collection",selectRoutes)
app.use("/api/shop-product",shopRoutes)

// app.use("/api/admin", adminRoutes);





module.exports = app