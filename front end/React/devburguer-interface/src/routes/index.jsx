import { createBrowserRouter } from 'react-router-dom';
import { Login }  from '../containers/Login';
import { Register } from '../containers/Registrer';
import { Home } from '../containers/Home'

export const router = createBrowserRouter([


     {
        path:'/',
        element:<Home/>,
    },

    {
        path:'/login',
        element:<Login/>,
    },

     {
        path:'/cadastro',
        element:<Register/>,
    },

]);