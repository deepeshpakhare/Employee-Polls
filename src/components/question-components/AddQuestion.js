import React, { useRef } from 'react';
import { Button } from 'antd';
import { _saveQuestion } from '../../database/Database';

export default function AddQuestion() {
  const optionOneRef = useRef(null);
  const optionTwoRef = useRef(null);

  const handleSubmit = async(e) => {
    e.currentTarget.disabled = true;
    const author = JSON.parse(localStorage.getItem("activeUser")).id;
    await _saveQuestion({ author: author,  })
  }
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
        <div style={{padding:20}}>
          <Button 
            type='primary'
            onClick={(e)=>handleSubmit(e)}
          >
              Submit
          </Button>
        </div>
      </center>
    </div>
  )
}
