import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals'; //Note: not sure what this does

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
    );
    
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
