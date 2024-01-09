import React from 'react';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import { isLoggedIn } from "../Functions/ReusableFunctions"
import { useLocation, useParams } from 'react-router-dom';

export default function Hoc(Component) {
    const InnerComponent = () => {
        const { question_id } = useParams();
        if (question_id) {
            return (
                <div>
                    {isLoggedIn() ? <div><Navbar /> <Component question_id={question_id} /></div> : <Login />}
                </div>
            )
        } else {
            return (
                <div>
                    {isLoggedIn() ? <div><Navbar /> <Component /></div> : <Login />}
                </div>
            )
        }

    }
    return <InnerComponent />;
}
