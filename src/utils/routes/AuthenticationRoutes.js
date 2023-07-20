/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication/Register')));
const ForgotPass = Loadable(lazy(() => import('views/pages/authentication/authentication/ForgotPass')));
const ResetPass = Loadable(lazy(() => import('views/pages/authentication/authentication/ResetPass')));
const AuthActivate = Loadable(lazy(() => import('views/pages/authentication/authentication/AuthActivate')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        },
        {
            path: '/forgot',
            element: <ForgotPass />
        },
        {
            path: '/reset',
            element: <ResetPass />
        },
        {
            path: '/activate',
            element: <AuthActivate />
        }
    ]
};

export default AuthenticationRoutes;
