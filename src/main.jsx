import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";

import { SearchProvider } from "./context/SearchContext";

import { ThemeProvider } from "./context/ThemeContext";

import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <ProgressProvider>
            <SearchProvider>

              <App />
            </SearchProvider>
          </ProgressProvider>
        </ToastProvider>

      </ThemeProvider>

    </AuthProvider>
  </React.StrictMode>
);