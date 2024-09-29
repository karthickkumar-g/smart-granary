import { Route, Routes } from "react-router";
import Home from '../pages/Home'
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Register from "../components/Register";
import { AuthProvider } from "../context/AuthContext";
import Profile from "../components/Profile";

const Routing = () => {
  return <div>
    <AuthProvider>
      <Routes>
        <Route element={<Navbar/>}>
          <Route  path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
    </Routes>
    </AuthProvider>
    
  </div>;
};

export default Routing;
