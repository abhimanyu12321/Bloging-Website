import { SpeakerNotes } from "@mui/icons-material"
import MyBlogDetails from "../components/MyBlogDetails"
import { useEffect, useState } from "react"
import { useBlogsContext } from "../hooks/useBlogsContext"

const Profile = ()=>{
    var u = JSON.parse(localStorage.getItem('user'))

    const {blogs,dispatch} = useBlogsContext()
    const [myBlogs,setMyBlogs] = useState([])

    useEffect(()=>{
        const fetchBlogs = async ()=>{
            const response = await fetch('https://anmol-solr.onrender.com/api/blogs')
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_BLOG',payload:json})
                setMyBlogs(json.filter(function(entry){
                    return entry.authorDetails.email==JSON.parse(localStorage.getItem('user')).email
                }))
            }
        }

        fetchBlogs()
    },[dispatch])
    console.log("Here Now    :    ",blogs)

    return (
        <div>
            <img src={u.picture} />
            <p><strong>Name : </strong>{u.name}</p>
            <p><strong>Email : </strong>{u.email}</p>
            <br/>
            
            <h1>My Blogs <SpeakerNotes style={{fontSize:40}}/></h1>
            <div className="home">
            <div className="blogs">
                {myBlogs && myBlogs.map((blog)=>{
                    return <MyBlogDetails key={blog._id} blog={blog}/>
                })}
            </div>

        </div>
        </div>
    )
}

export default Profile