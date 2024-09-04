const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.URI
mongoose.connect(URI)
.then(()=> {
    console.log('Database connected successfully')
})
.catch((err) => {
    console.log(err.message);
})