import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Login from '../Login/Login';
import { isLoggedIn } from "../functions/ReusableFunctions"
import { useParams } from 'react-router-dom';

export default function Hoc(Component) {
    const InnerComponent = () => {
        const users = useSelector((state) => state.auth.authDetails);
        const { question_id } = useParams();
        if (question_id) {
            return (
                <div>
                    {isLoggedIn(users) ? <div><Navbar /> <Component question_id={question_id} /></div> : <Login />}
                </div>
            )
        }
        return (
            <div>
                {isLoggedIn(users) ? <div><Navbar /> <Component /></div> : <Login />}
            </div>
        )
    }
    return <InnerComponent />;
}
