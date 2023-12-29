import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import Login from '../Login/Login';


export default function Hoc(Component) {
    const InnerComponent = () => {
        const users = useSelector((state) => state.authDetails);
        const isloggedIn = ()=>{
            for(let user of users) {
                if(user.loggedIn){
                    return true;
                }
            }
            return false;
        }
        return (
            <div>
                {isloggedIn()?<div><Navbar/> <Component/></div>:<Login/>}
            </div>
        )
    }
    return <InnerComponent/>;
}
