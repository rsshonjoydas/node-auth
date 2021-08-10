const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
require("./db/connectDB")
const authRoutes = require("./routes/auth")

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors())

// ! middleware
app.use('/api', authRoutes)

app.listen(5000, () => {
  console.log('app listening at port 5000');
});
