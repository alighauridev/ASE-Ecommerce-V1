import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'



export default function PrivateRouter() {
    const UserLogin = useSelector((state) => state.UserLogin);
    const { userInfo } = UserLogin;
    return (
        <>
            <Outlet />
        </>

    )
}