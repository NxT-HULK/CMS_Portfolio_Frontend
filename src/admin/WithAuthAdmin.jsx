import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/data/DataContext';
import FunctionContext from '../context/function/FunctionContext';
import AdminContext from '../context/admin/AdminContext';
import AdminTemplate from './AdminTemplate'
import axios from 'axios';

const AdminRoute = ({ element: Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    const dataContext = useContext(DataContext);
    const functionContext = useContext(FunctionContext)
    const adminContext = useContext(AdminContext)

    const { backendHost } = dataContext
    const { setAuthorityMode } = adminContext

    useEffect(() => {
        if (isAuthenticated === true) {
            return;
        } else {
            (async () => {
                try {
                    const response = await axios.post(`${backendHost}/api/admin/login`, {}, { withCredentials: true })
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        const temp = response?.data?.split("Mode: ")
                        setAuthorityMode(temp[1])
                    } else {
                        setIsAuthenticated(false);
                        navigate('/auth');
                    }
                } catch (error) {
                    console.error(error);
                    setIsAuthenticated(false);
                    navigate('/auth');
                }
            })();
        }
        // eslint-disable-next-line
    }, [navigate]);

    if (isAuthenticated === null) {
        return <div className='my-5 py-5'>Authenticating...</div>
    }

    return isAuthenticated ?
        <>
            <AdminTemplate>
                <Component DataContext={dataContext} FunctionContext={functionContext} AdminContext={adminContext} />
            </AdminTemplate>
        </>
        : null;
};

export default AdminRoute;
