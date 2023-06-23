const mongoose = require('mongoose');
require('mongoose-type-email')


const blogSchema = new mongoose.Schema({
  
  authorDetails: {
    name:{
      type: String,
      required: true,
    },
    email:{
      type: mongoose.SchemaTypes.Email,
      required: true,
    }
  },
  
  title: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  articleBody: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
