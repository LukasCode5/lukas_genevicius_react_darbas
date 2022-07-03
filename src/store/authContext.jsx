import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  isUserLoggedIn: false,
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const isUserLoggedIn = !token ? false : true;

  function login(userToken) {
    setToken(userToken);
    localStorage.setItem('userToken', userToken);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem('userToken');
  }

  const ctx = {
    isUserLoggedIn,
    login,
    logout,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
