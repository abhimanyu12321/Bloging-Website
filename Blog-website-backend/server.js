require('dotenv').config()

const cors = require('cors')
const express = require('express')

const blogRoutes = require('./routes/blogs')
const mongoose = require('mongoose')

// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// routes
app.use('/api/blogs',blogRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log('listening on port 4000 !!! ')
        })
    })
    .catch((error)=>{
        console.log(error)
    })

//listen for request

