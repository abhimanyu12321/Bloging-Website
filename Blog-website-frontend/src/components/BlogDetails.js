

import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useNavigate } from "react-router-dom"

const BlogDetails = ({blog})=>{

    

    const navigate = useNavigate()


    return(
        <div className="blog-details">
            <img src={blog.image} alt={blog.title}  />
            <h4 onClick={()=>{navigate(`/blog/${blog._id}`)}}>{blog.title}</h4>
            <p><strong>Author :</strong> {blog.authorDetails.name}  </p>
            <p><strong>Email :</strong> {blog.authorDetails.email} </p>
            <br/>
            <p><strong>Description :</strong> {blog.description}</p>
            <br/>
            <p>{formatDistanceToNow(new Date(blog.createdAt) , {addSuffix :true} )}</p>
        </div>
    )
}

export default BlogDetails