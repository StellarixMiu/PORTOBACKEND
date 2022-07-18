import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'

import userRoutes from './src/routes/usersRoute.js'
import authRoutes from './src/routes/authRoute.js'
import projectRoutes from './src/routes/projectsRoute.js'
import contactRoutes from './src/routes/contactsRoute.js'

dotenv.config()
const app = express()
const URI = process.env.DB_URI

const corsConfig = {
  origin: true,
  credentials: true,
}

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))
app.use(express.urlencoded({extended: true}))

const connect = () => {
  mongoose.connect(URI)
  .then(()=> {
    console.log('Database Connected') 
  }).catch((err)=> {
    throw err
  })
}

const imgStorages = multer.diskStorage({
  destination: (req ,file ,cb) => {
    cb(null, 'uploads')
  },
  filename: (req ,file ,cb) => {
    cb(null, file.originalname)
  }
})

app.get('/', (req, res) => {
  res.status(200).send('Client Ready')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/contacts', contactRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Somethink went wrong!!'
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

app.listen(
  process.env.PORT, () => {
    connect()
    console.log('APP running on http://localhost:' + process.env.PORT)
    }
  )