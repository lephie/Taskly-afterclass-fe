import { Routes, Route } from 'react-router'
import Login from './pages/login'
import SignUp from './pages/signup'
import Dashboard from './pages/dashboard'


function Router() {


  return (
    <Routes>
     <Route path='/Login' element={<Login/>}/>
     <Route path='/SignUp' element={<SignUp/>}/>
     <Route path='/' element={<Dashboard/>}/>
    </Routes>
  )
}

export default Router
