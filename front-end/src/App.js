import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Router from "./Router";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <main className="container">
        <Router />
      </main>
    </AuthProvider>
  );
}

export default App;
