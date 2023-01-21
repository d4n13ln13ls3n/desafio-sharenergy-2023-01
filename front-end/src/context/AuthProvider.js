import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [username, setUsername] = useState('');

  const context = useMemo(() => ({
    loading,
    setLoading,
    isAuthenticated,
    setIsAuthenticated,
    username,
    setUsername,
  }), [loading, isAuthenticated, username]);

  return (
    <AuthContext.Provider value={ context }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
