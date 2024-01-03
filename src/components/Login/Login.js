import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, logInSuccess, selectUser } from '../../redux/authSlice';
import { Select, Input, Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { _getQuestions, _getUsers } from '../../database/Database';
import { setQuestions } from '../../redux/appDataSlice';

const titleStyle = {
  fontSize: 30,
  color: "blue",
  textDecoration: "underline"
}

export default function Login() {
  const users = useSelector((state)=>state.auth.authDetails);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState({avatarURL:"sarahedo.jpg"});
  const navigate = useNavigate();

  /**
   * @description "Creates options for dropdown menu of impersonated employees
   * for logging in"
   * @param {array} users 
   * @returns {array}
   */
  const createOptions = (users) => {
    let result = [];
    const usersObj = users[0];
    for (const key in usersObj) {
      result.push({
        value: usersObj[key].name,
        label:  usersObj[key].name,
      })
    }
    console.log(result);
    return result;
  }

  /**
   * @description "It is called whenever the selection of user is changed.
   * It dispatched the user object with selectUser reducer and sets the
   * corresponding password of user in the password field"
   * @param {string} val 
   */
  const handleUserChange = (val) => {
    const usersObj = users[0];
    for (const key in usersObj) {
      if (usersObj[key].name === val) {
        setSelectedUser(usersObj[key]);
        setPassword(usersObj[key].password);
      }
    }
  }

  console.log(selectedUser);
  const handleLogIn = () => {
    
        if (selectedUser.password === password) {
          dispatch(logInSuccess(selectedUser));
          alert("yes")
          navigate("/home");
        } else {
          alert("Username and Password did not match");
        }
  }

  useEffect(() => {
    let mounted = true;
    (async() => {
      if (mounted) {
        await _getUsers().then((data) => dispatch(getUsers(data)));
      }
    }
    )();
    return () => mounted = false;
  }, [])

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
          src={require(`../../avatars/${selectedUser.avatarURL}`)}
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
          type='text'
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
          onClick={(e) => handleLogIn()}
        >
          Log In
        </Button>
      </Flex>
    </div>
  )
}
