import { useEffect } from "react"
import { useBlogsContext } from "../hooks/useBlogsContext"

import BlogDetails from "../components/BlogDetails"
import { SpeakerNotes } from "@mui/icons-material"

const Home = ()=>{
    const {blogs,dispatch} = useBlogsContext()

    useEffect(()=>{
        const fetchBlogs = async ()=>{
            const response = await fetch('https://anmol-solr.onrender.com/api/blogs')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_BLOG',payload:json})
            }
        }

        fetchBlogs()
    },[dispatch])
    console.log("Here Now    :    ",blogs)
    return (
        <div>
        <div>
                <h1>All Blogs <SpeakerNotes style={{fontSize:40}}/>
                </h1>
            </div>
        <div className="home">
            <div className="blogs">
                {blogs && blogs.map((blog)=>{
                    return <BlogDetails key={blog._id} blog={blog}/>
                })}
            </div>

        </div>
        </div>
    )
}

export default Home