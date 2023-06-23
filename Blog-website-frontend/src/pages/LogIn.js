import { useEffect } from "react"
import jwtDecode from "jwt-decode"
import { useNavigate } from "react-router-dom"

const LogIn = ()=>{

    const navigate = useNavigate()

    function handleCallbackResponse(response){
        console.log("encoded =>     \n" + response.credential)
        var userObject = jwtDecode(response.credential)
        console.log(userObject)

        localStorage.setItem('user', JSON.stringify(userObject));
        console.log(localStorage.getItem('user'))
        navigate("/home")
        window.location.reload()
        
    }

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id:'1074724305532-a7lecou54ct2qsrdqflireqdou7u03d1.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {
                theme:'outline',
                size:'large',
                width:'400px',
                
            }
        )
    })


    return (
        <div style={{display:'flex',flexDirection:'column', alignItems:'center',marginTop:40}}>
            <h1>Log in to your account</h1>
            <div id='signInDiv'></div>
        </div>
        
    )
}


export default LogIn