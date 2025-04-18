
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deviceId,setDeviceId] = useState("");

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, deviceId,setDeviceId }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
