import {Menu} from 'antd'

import { AccountCircle, EditOutlined, Group, Home, Logout } from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'

const SideBar =() => {
  const navigate = useNavigate()
  const [selected,setSelected] = useState('')
    return (
      <div>
        <Menu className='sidebar'
          selectedKeys={selected}
          onClick={
            ({key})=>{
              if(key==='signout'){
                Swal.fire({
                  title: "Are You Sure ?",
                  text: "Please confirm if you want to SignOut",
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: "SignOut",
                  confirmButtonColor: "#F27474",
                  cancelButtonText: "Cancel",
                  icon: "question",
                }).then((result)=>{
                  if(result.isConfirmed){
                    localStorage.removeItem('user')
                    window.location.reload()
                  }
                  
                })
                
              }
              else{
                setSelected(key)
                 navigate(key) 
              }
            }
          } 

          items={[
            {label:'Home',key:'/home',icon:<Home/>},
            {label:'Profile',key:'/profile',icon:<AccountCircle/>},
            {label:'Create Blog',key:'/create-blog',icon:<EditOutlined/>},
            {label:'About Us',key:'/about-us',icon:<Group/>},
            {label:'SignOut',key:'signout',icon:<Logout/>,danger:true,}
          ]}> 

        </Menu>
      </div>
    )
}

export default SideBar;