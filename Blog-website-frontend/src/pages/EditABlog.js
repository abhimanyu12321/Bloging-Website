import EditBlog from "../components/EditBlog"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"


const EditABlog = ()=>{

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


    return (
        <div>{blog && <EditBlog editBlog={blog}/> }</div>
        
        
    )
}

export default EditABlog