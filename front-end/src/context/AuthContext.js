import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

import { saveStorage, readStorage } from "../services/localStorage";
import { signLogin } from "../services/endpointRequest";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const rememberMe = Boolean(readStorage('remember-me'));

    if (rememberMe) {
      return readStorage('authenticatedUser');
    }

    return null;
  });

  const isAuthenticated = Boolean(user);

  async function signIn({ username, password, rememberMe }) {
    const authenticatedUser = await signLogin('login', {username, password});

    saveStorage('remember-me', rememberMe);
    saveStorage('token', authenticatedUser.token);
    saveStorage('user', JSON.stringify(authenticatedUser));

    setUser(authenticatedUser);
    
    return authenticatedUser;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
      }}
    >
      {children}  
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}