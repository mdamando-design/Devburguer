import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import GlobalStyles from './styles/globalStyles';
import { ToastContainer } from 'react-toastify';
import { router } from './routes';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <GlobalStyles/>
    <ToastContainer autoClose={2000} theme='colored'/>
  </React.StrictMode>,
);
