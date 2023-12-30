import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Login from '../Login/Login';
import { isLoggedIn } from "../functions/ReusableFunctions"

export default function Hoc(Component) {
    const InnerComponent = () => {
        const users = useSelector((state) => state.authDetails);
        return (
            <div>
                {isLoggedIn(users)?<div><Navbar/> <Component/></div>:<Login/>}
            </div>
        )
    }
    return <InnerComponent/>;
}
