import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import NewUserPage from 'pages/NewUserPage';
import AccountPage from 'pages/AccountPage';

import Route from 'constants/route';

const router = createBrowserRouter([
    {
        path: Route.home,
        element: <HomePage />,
    },
    {
        path: Route.login,
        element: <LoginPage />,
    },
    {
        path: Route.newUser,
        element: <NewUserPage />,
    },
    {
        path: Route.account,
        element: <AccountPage />,
    },
]);

const App: React.FC = () => {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    );
};

export default App;
