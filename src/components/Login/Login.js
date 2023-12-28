import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logInSuccess, selectUser } from '../../redux/authSlice';
import { Select, Input, Button, Flex } from 'antd';


const titleStyle = {
  fontSize: 30,
  color: "blue",
  textDecoration: "underline"
}

export default function Login() {
  const users = useSelector((state) => state.authDetails);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const avatar = require(`../../avatars/${selectedUser.avatar}`);



  /**
   * @description "Creates options for dropdown menu of impersonated employees"
   * @param {array} users 
   * @returns {array}
   */
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
      if (user.username === val) {
        setSelectedUser(user);
        dispatch(selectUser(user));
        setPassword(user.password);
      }
    }
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    let count = 0;
    for (let user of users) {
      if (user.selected) {
          if(user.password === password) {
            dispatch(logInSuccess(selectedUser));
          }else {
            alert("Username and Password did not match");
          }
      }else{
        count++;
      }
    }
    if (count >= users.length) {
      alert("Please select a user");
    }
  }

  return (
    <div>
      <Flex
        wrap='wrap'
        gap={10}
        vertical={true}
        align="center"
        justify="center"
      >
        <h1 style={titleStyle}>
          Employee Polls
        </h1>
        <h2>
          Log In
        </h2>
        <img
          src={avatar}
          alt={selectedUser.avatar}
          width={200}
          height={200}
        />
        <Select
          defaultValue="Select user to log in"
          style={{
            width: 200,
          }}
          onChange={handleUserChange}
          options={createOptions(users)} />
        <Input
          type='password'
          value={password}
          style={{ width: 200 }}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
        <Button
          style={{
            width: 200,
          }}
          type="primary"  
          onClick={(e)=>handleLogIn(e)}
        >
          Log In
        </Button>
      </Flex>
    </div>
  )
}
