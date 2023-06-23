import { Route, Routes } from "react-router-dom"
import SingleBlog from "../components/SingleBlog"
import AboutUs from "../pages/AboutUs"
import CreateBlog from "../pages/CreateBlog"
import EditABlog from "../pages/EditABlog"
import Home from "../pages/Home"
import LogIn from "../pages/LogIn"
import Profile from "../pages/Profile"

const PageRoutes = ()=>{
    const user = localStorage.getItem('user')
    return (
        <div>

            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/create-blog" element={<CreateBlog />}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/blog/:id" element={<SingleBlog/>}/>
                <Route path="/edit/:id" element={<EditABlog/>}/>
            </Routes>
        </div>
    )
}

export default PageRoutes