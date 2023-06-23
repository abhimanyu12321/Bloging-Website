const express = require('express')

const {
    getBlogs,
    getUserBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
} = require('../controllers/blogController')

const router = express.Router() 

// GET all Blogs
router.get('/',getBlogs)

// GET all Blogs of a single user
router.get('/email/:email',getUserBlogs)

// GET a single Blog
router.get('/:id', getBlog)

//POST a new Blog
router.post('/', createBlog)

//DELETE a  Blog
router.delete('/:id',deleteBlog) 

//UPDATE a new Blog
router.patch('/edit/:id',updateBlog)

module.exports = router 