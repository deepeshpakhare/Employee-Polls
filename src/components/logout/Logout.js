import React from 'react';
import { Link } from 'react-router-dom';

export default function Logout() {
  return (
    <div>
      <center>
        <h1>Logged Out!</h1>
        <h1>{<Link to={"/"}>Log in again</Link>}</h1>
      </center>
    </div>
  )
}
