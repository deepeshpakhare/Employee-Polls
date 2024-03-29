import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logInSuccess, setUsers } from '../../redux/authSlice';
import { Select, Input, Button, Flex } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { _getQuestions, _getUsers } from '../../database/Database';


const titleStyle = {
  fontSize: 30,
  color: "blue",
  textDecoration: "underline"
}

export default function Login() {
  const users = useSelector((state) => state.auth.authDetails);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState({ avatarURL: "employee-collage.jpg" });
  const [showPasswordField, setShowPasswordField] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
        label: usersObj[key].name,
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
    setShowPasswordField(true);
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
      /*const locationToRedirect = localStorage.getItem("location");
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      console.log(activeUser);
      if (activeUser) {
        if (locationToRedirect !== "/home" && activeUser.id === selectedUser.id) {
          dispatch(logInSuccess(selectedUser));
          localStorage.setItem("redirectedFrom","/login");
          navigate(locationToRedirect);
        } else {
          dispatch(logInSuccess(selectedUser));
          navigate("/home");
        }
      } else {
        dispatch(logInSuccess(selectedUser));
        navigate("/home");
      }
      */
     const path = localStorage.getItem("path");
      if (path) {
        dispatch(logInSuccess(selectedUser));
        navigate(path, {state:{from:location.pathname}});
        localStorage.removeItem("path");
      } else {
        dispatch(logInSuccess(selectedUser));
        navigate("/home", {state:{from:location.pathname}});
      }
    } else {
      alert("Username and Password did not match");
    }
  }
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) {
        await _getUsers().then((data) => dispatch(setUsers(data)));
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
        {showPasswordField && <Input
          type='password'
          value={password}
          style={{ width: 200 }}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />}
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
