import {Link} from 'react-router-dom'

const Navbar = ()=>{
    return (
        <header>
            <div className="container">
                <Link to="/">
                   <h1>My Blogs <span className="material-symbols-outlined" style={{fontSize:40}}>rss_feed</span> </h1>
                   
                </Link>
            </div>
        </header>
    )
}

export default Navbar