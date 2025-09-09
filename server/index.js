const express = require('express')
const connectToMongo = require('./db')

const app = express()
const PORT = 8000

app.use(express.json())

connectToMongo()

app.use('/server/v1/apis/report', require('./routes/report'))

app.listen(PORT, () => console.log(`App is running at http://localhost:${PORT}`))