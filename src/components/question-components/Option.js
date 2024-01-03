import React from 'react';
import { Card, Button } from 'antd';
import { _saveQuestionAnswer } from '../../database/Database';

export default function Option({ id, text, user, answered, votes, totalVotes, optionName }) {
    
    const handleOptionClick = async(e) => {
        e.preventDefault();
        //const userId = user.id;
        console.log(optionName);
        await _saveQuestionAnswer({ authedUser:user.id, qid:id, answer:optionName }).then((res)=>console.log(res))
        .catch((error)=> console.log(error));
    }
   
    if (answered) {
        return (
            <div>
                <Card title={text}>
                    <p>Votes:{votes}</p>
                    <p>Percentage:{(votes/totalVotes * 100).toFixed(2)}%</p>
                </Card>
            </div>
        )
    }
    
    return (
        <div>
            <Card title={text}>
                <p><Button type='primary' onClick={(e)=> handleOptionClick(e)}>Click To Vote</Button></p>
            </Card>
        </div>
    )
}
