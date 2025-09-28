const dotenv=require("dotenv")
dotenv.config()
const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8000
const BASE_URL=process.env.FRONTEND_BASE_URL

app.use(express.json())
app.use(cors({ 
    origin: ['http://localhost:3000', `${BASE_URL}`],
    credentials: true,
 }))
 

connectToMongo()

app.use('/server/v1/apis/report', require('./routes/report'))
app.use('/server/v1/apis/user', require("./routes/user"))

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))