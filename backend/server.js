require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const userRoutes = require('./routes/user')
const dataRoutes = require('./routes/dataRoutes')
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/data', dataRoutes)
app.use('/api/user', userRoutes)

let mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect("mongodb+srv://artan:1234567890@cluster0.ucdkl9k.mongodb.net/?retryWrites=true&w=majority", mongooseConfig)


app.listen(process.env.PORT, () => console.log("Server started on port", process.env.PORT))