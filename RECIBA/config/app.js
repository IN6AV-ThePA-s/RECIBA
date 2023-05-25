const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3033

/* ROUTES */

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

/* START SERVER */
exports.initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}