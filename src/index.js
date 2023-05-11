import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from "@supabase/supabase-js"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

const supabase = createClient(
  "https://rdngbgyfqpzuotsbccmo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkbmdiZ3lmcXB6dW90c2JjY21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxOTc2MjMsImV4cCI6MTk5ODc3MzYyM30.L58o3Sh4FY5XF5NBINHKuq8yPpuaZYYSx7bwBFQ9z0g"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
