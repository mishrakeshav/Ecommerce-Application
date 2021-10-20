import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Message from './pages/Message';
import ViewProduct from './pages/ViewProduct';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import MyAccount from './pages/MyAccount';
import CartNew from './pages/CartNew';


// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/products/" replace /> },
        { path: 'app', element: <DashboardApp /> },
        // { path: ':token', element: <User /> },
        { path: 'mycart', element: <Cart /> },
        { path: 'myorders', element: <Orders /> },
        { path: 'myaccount', element: <MyAccount /> },
        { path: 'products', element: <Products /> },
        { path: 'products/:id', element: <ViewProduct /> },
        { path: 'blog', element: <Blog /> },
        { path: 'cartnew', element: <CartNew /> }
      ]
    },
    {
      path: '/',      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
