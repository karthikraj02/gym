import { createContext, useContext, useState, useEffect } from 'react';
import api from '../hooks/useApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('vajra_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/auth/me', token)
        .then(data => {
          setUser(data.user || data);
        })
        .catch(() => {
          localStorage.removeItem('vajra_token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    const jwt = data.token;
    localStorage.setItem('vajra_token', jwt);
    setToken(jwt);
    setUser(data.user || data);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.post('/auth/register', { name, email, password });
    const jwt = data.token;
    localStorage.setItem('vajra_token', jwt);
    setToken(jwt);
    setUser(data.user || data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('vajra_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
