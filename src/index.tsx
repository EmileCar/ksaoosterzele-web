import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css'
import App from './App';
import { PrimeReactProvider } from "primereact/api";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
);