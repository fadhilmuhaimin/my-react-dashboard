import { Navigate, useRoutes } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoginPage from "../pages/auth/LoginPage";
import MainLayout from "../assets/components/layout/MainLayout";
import ProductPerformancePage from "../pages/product/ProductPerformancePage";
import ProductManagementPage from "../pages/product/ProductManagementPage";
import ProductEditPage from "../pages/product/ProductEditPage";
import ProfilePage from "../pages/profile/ProfilePage";
import PropTypes from "prop-types";
import AddNewProduct from "../pages/product/AddNewProduct";

const ProtectedRoute = ({ children }) => {
    const { accessToken } = useAuthStore();
    if (!accessToken) {
        return <Navigate to="/login" />;
    }
    return children;
};

// Define prop types for ProtectedRoute
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensure 'children' is a valid React node and required
};

const Router = () => {
    const routes = useRoutes([
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            ),
            children: [
                { index: true, element: <ProductPerformancePage /> },
                { path: 'product-management', element: <ProductManagementPage /> },
                { path: 'product-edit/:id', element: <ProductEditPage /> },
                { path: 'add-new-product', element: <AddNewProduct /> },
                { path: 'profile', element: <ProfilePage /> },
            ]
        }
    ]);

    return routes;
};
export default Router;