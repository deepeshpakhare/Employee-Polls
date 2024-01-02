import React from 'react';
import { Card, Button } from 'antd';

export default function Option({ id, text, user, answered, votes, totalVotes, optionName }) {
    
    const handleOptionClick = (e) => {
        e.preventDefault();
        console.log(`${id} ${user.username} ${optionName}`);
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
