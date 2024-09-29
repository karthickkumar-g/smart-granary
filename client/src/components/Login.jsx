// Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useAuth } from '../context/AuthContext'; 

axios.defaults.baseURL = 'http://localhost:8000'; 

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post('/api/login', {
        emailOrUsername,
        password,
      });
      const { token } = response.data;
      console.log("Logged in successfully");
      localStorage.setItem("token", token);
      setIsAuthenticated(true); 
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid login credentials");
      }
      console.error(err);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="emailOrUsername" className="block text-left font-semibold mb-2">
              Email or Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-left font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="device" className="block text-left font-semibold mb-2">
              Select Device
            </label>
            <select
              id="device"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Select Device --
              </option>
              <option value="device1">Device 1</option>
              <option value="device2">Device 2</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
