import React from 'react';
import Navbar from '../Navbar/Navbar';

export default function Hoc(Component) {
  return (
    <div>
        <Navbar/>
        <Component/>
    </div>
  )
}
