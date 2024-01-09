import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import { _saveQuestion } from '../../database/Database';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddQuestion() {
  const optionOneRef = useRef(null);
  const optionTwoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.currentTarget.disabled = true;
    const author = JSON.parse(localStorage.getItem("activeUser")).id;
    const optionOne = optionOneRef.current.value;
    const optionTwo = optionTwoRef.current.value;
    if (optionOne !== "" && optionTwo !== "") {
      const submitted = await _saveQuestion({ author: author, optionOneText: optionOne, optionTwoText: optionTwo })
        .then((res) => res).catch((error) => error);
      if (submitted) {
        navigate("/home", { replace: true })
      } else {
        alert(submitted);
      }
    } else {
      alert("Option one or option two can not be empty");
      e.currentTarget.disabled = false;
    }

  }

  useEffect((
    () => {
      if (location.key !== localStorage.getItem("locationKey")) {
        localStorage.setItem("locationKey", location.key);
      } else {
        localStorage.setItem("location", location.pathname);
        navigate("/");
        return;
      }
    }
  ), [])

  return (
    <div>
      <div style={{ height: 20 }}></div>
      <center>
        <h3>
          (Create your own poll)
        </h3>
        <h1>
          Would you rather
        </h1>
        <div style={{ padding: 10 }}> First Option</div>
        <div><input type='text'
          placeholder='option One'
          style={{ width: 600 }}
          ref={optionOneRef}
        />
        </div>
        <div style={{ padding: 10 }}> Second Option</div>
        <div><input type='text'
          placeholder='option Two'
          style={{ width: 600 }}
          ref={optionTwoRef}
        />
        </div>
        <div style={{ padding: 20 }}>
          <Button
            type='primary'
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </div>
      </center>
    </div>
  )
}
