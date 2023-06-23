const Blog = require('../models/blogSchema')
const mongoose = require('mongoose')

// get all blogs
const getBlogs = async (req,res)=>{
    const blogs = await Blog.find({}).sort({createdAt : -1})
    res.status(200).json(blogs)
}

// get all blogs of a User
const getUserBlogs = async (req,res)=>{
    const {email} = req.params 
    var query = {authorDetails:{email:email}}

    const userBlogs = await Blog.find(query).sort({createdAt : -1})
    res.status(200).json(userBlogs)
}

// get a single blog
const getBlog = async (req,res) => {
    
    const {id}  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Blog'})
    }

    const blog =  await Blog.findById(id)
    if(!blog){
        return res.status(404).json({error: 'No Such Blog'})
    }
    res.status(200).json(blog)
}


// create new blog
const  createBlog = async (req,res) => {
    const {authorDetails,title, description, image, articleBody, category} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
        
    if(!description){
        emptyFields.push('description')
    }
        
    if(!image){
        emptyFields.push('image')
    }
        
    if(!articleBody){
        emptyFields.push('articlebody')
    }
        
    if(!category){
        emptyFields.push('category')
    }
   

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill all the fields' , emptyFields})
    }

    // add doc to db
    try{
        const blog = await Blog.create({authorDetails,title, description, image, articleBody, category})
        res.status(200).json(blog)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// delete a blog
const deleteBlog = async (req,res) => {
    const {id}  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Blog'})
    }

    const blog = await Blog.findOneAndDelete({_id:id})
    
    if(!blog){
        return res.status(404).json({error: 'No Such Blog'})
    }

    res.status(200).json(blog)

}

// update blog
const updateBlog = async (req,res)=>{
    const {id}  = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Blog'})
    }
    
    const blog = await Blog.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!blog){
        return res.status(404).json({error: 'No Such Blog'})
    }

    res.status(200).json(blog)
} 


module.exports = {
    getBlogs,
    getUserBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
}
