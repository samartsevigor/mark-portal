import express from 'express'
import authRouters from './routes/auth.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose";
dotenv.config()

const server = express()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('DB is connected'))
  .catch(() => console.log('Error'))

// middleware
server.use(morgan('dev'))
server.use(express.json())
server.use(cors())


server.use('/api', authRouters)


const port = process.env.PORT || 8000
server.listen(port, () => {
  console.log('Server is started')
})