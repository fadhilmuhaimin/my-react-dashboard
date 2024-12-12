import { Navigate, useRoutes } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoginPage from "../pages/auth/LoginPage";
import MainLayout from "../assets/components/layout/MainLayout";
import ProductPerformancePage from "../pages/product/ProductPerformancePage";
import ProductManagementPage from "../pages/product/ProductManagementPage";
import ProductEditPage from "../pages/product/ProductEditPage";
import ProfilePage from "../pages/profile/ProfilePage";
import React from 'react';

const ProtectedRoute = ({ children }) => {
    const {accessToken} = useAuthStore();
    if (!accessToken) {
        return <Navigate to="/login" />;
    }
    return children;
};

const Router =()=>{
    const routes = useRoutes([
        {
            path:'/login',element:<LoginPage />
        },
        {
            path:'/',element:<ProtectedRoute>
                <MainLayout>
                    <ProductPerformancePage />
                </MainLayout>
            </ProtectedRoute>
        },
        {
            path:'/product-management',
            element:(
                <ProtectedRoute>
                    <MainLayout>
                        <ProductManagementPage />
                    </MainLayout>
                </ProtectedRoute>
            )
        },
        {
            path:'/product-edit/:id',
            element:(
                <ProtectedRoute>
                    <MainLayout>
                        <ProductEditPage />
                    </MainLayout>
                </ProtectedRoute>
            )
        },
        {
            path:'/profile',
            element:(
                <ProtectedRoute>
                    <MainLayout>
                        <ProfilePage />
                    </MainLayout>
                </ProtectedRoute>
            )
        },
    ]);
    return routes;

};

export default Router;