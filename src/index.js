import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';


const jsx = (
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

ReactDOM.render(jsx, document.getElementById('root'));
