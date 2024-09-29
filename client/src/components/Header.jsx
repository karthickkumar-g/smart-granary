import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Profile from "./Profile";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [profileClick, setProfileClick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const profileHandler = () => {
    setProfileClick(!profileClick);
  };

  const closeProfile = () => {
    setProfileClick(false);
  };

  return (
    <header className="bg-color text-white shadow-lg">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Smart Granary</Link>
        </div>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={profileHandler}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
              >
                View Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Logout
              </button>
            </>
          )}
          {profileClick && <Profile onClose={closeProfile} />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
