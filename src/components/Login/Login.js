import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/authSlice';
import { Select } from 'antd';

export default function Login() {
  const users = useSelector((state) => state.authDetails);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");


  const createOptions = (users) => {
    let result = [];
    for (let user of users) {
      result.push({
        value: user.username,
        label: user.username,
      })
    }
    console.log(result);
    return result;
  }

  const handleUserChange = (val) => {
    for (let user of users) {
      console.log(`${val}, ${user.username}`)
      if (user.username === val) {
        dispatch(selectUser(user));
        setPassword(user.password);
      }
    }
  }

  return (
    <div>
      <div className='title'>
        Employee Polls
      </div>
      <div className='login-card'>
        <div className='sign-in'>
          Log-In
        </div>
        <div className='log-in-form'>
          <div className='username'>
            <Select
              defaultValue="Select user to log in"
              style={{
                width: 120,
              }}
              onChange={handleUserChange}
              options={createOptions(users)} />
          </div>
          <div className='password'>
            <input type='text' value={password} disabled={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
