import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, email, setEmail, setUser, token, setToken, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
