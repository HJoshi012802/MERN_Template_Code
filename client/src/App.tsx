import {Route, Routes} from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import {ForgetPassword} from "./pages/ForgetPassword";
import {ResetPassword} from "./pages/ResetPassword";
import { AdminSignUp } from "./pages/AdminRegister";

function App() {


  return (
   <Routes>
      <Route path='/' element={<Navbar/>}>
      <Route index element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgetpassword/:email' element={<ForgetPassword/>}/>
      <Route path='/resetpassword' element={<ResetPassword/>}/>
      <Route path="/admin/register" element={<AdminSignUp/>}/>
      </Route>
   </Routes>
  )
}

export default App