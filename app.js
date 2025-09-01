import dotenv from 'dotenv'
import express from 'express'
import web from './routes/web.js'

dotenv.config()
const app = express()
import connectDB from './db/connectdb.js'
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL;

//Database Connection
connectDB(DATABASE_URL);
// middleware for json data request body
app.use(express.json());

// calling all routing with controllers
app.use('/student', web);


app.listen(PORT, () => {
    console.log(`Development server start at : http://localhost:${PORT}`)
});
