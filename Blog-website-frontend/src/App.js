
import {BrowserRouter } from 'react-router-dom'
import Header from './components/Header';

// pages and components
import SideBar from './components/SideBar';
import LogIn from './pages/LogIn';
import PageRoutes from './routes/PageRoutes';
 
function App() {
  const user = localStorage.getItem('user');
  console.log(user)

  return (
    <div>
      <Header/>
      <BrowserRouter>
      {!user && <LogIn />}
      {user &&
      <div className="App" >
      
        
        <SideBar className="sidebar"/>
        
        <div className='pages'>
          <PageRoutes/>
        </div>
      
      </div>
      }
      </BrowserRouter>
   
    </div>

    
  );
}

export default App;
