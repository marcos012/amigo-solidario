import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

import Routes from './routes';
import './global.css'


function App() {
  return (
    <div>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </div>
  );
}

export default App;
