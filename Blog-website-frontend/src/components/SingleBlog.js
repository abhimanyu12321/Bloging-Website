
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useState ,useEffect} from "react"
import { useParams } from "react-router-dom"
import { Markup } from "interweave"

const SingleBlog = ()=>{

    const [blog,setBlog] = useState(null)

    const {id} = useParams()
    console.log(id)

    useEffect(()=>{
        const fetchBlog = async ()=>{
            const response = await fetch('https://anmol-solr.onrender.com/api/blogs/'+id)
            const json = await response.json()

            if(response.ok){
                setBlog(json)
                console.log(json)
            }
        }

        fetchBlog()
    },[])
    console.log("Here Now SingleBlog   :    ",blog)
   

    if(blog==null){
        return <div></div>
    }

    return(
        
        <div className="single-blog">
            <img className="single-blog-img" src={blog.image} alt={blog.title}  />
            <h4 className="single-blog-h4">{blog.title}</h4>
            <br/>
            <p className="single-blog-p"><strong>Author :</strong> {blog.authorDetails.name}  </p>
            <p className="single-blog-p"><strong>Email :</strong> {blog.authorDetails.email} </p>
            <br/>
            <p className="single-blog-p"><strong>Description :<br/></strong> {blog.description}</p>
            <br/>
            <p className="single-blog-p"><strong>Article :<br/></strong></p>
            <br/>
            <Markup content={blog.articleBody}/>
            <br/>
            <p className="single-blog-p">{formatDistanceToNow(new Date(blog.createdAt) , {addSuffix :true} )}</p>
        </div>
    )
}

export default SingleBlog