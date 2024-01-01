import React from 'react';
import { Card,Button } from 'antd';
import { Link } from 'react-router-dom';

export default function QuestionCard({ question }) {
    const displayTimeString = () => {
       const time = new Date(question.dateCreated);
       const hours = time.getHours();
       const minutes = time.getMinutes();
       if ( hours > 12) {
            return `${hours - 12}:${minutes} PM`;
       } else if ( hours === 12) {
            return `${hours}:${minutes} PM`;
       } else {
            return `${hours}:${minutes} AM`;
       }
    }
    return (
        <div>
            <Card title={question.askedBy} style={{border:"1px solid black"}}>
                <p>{`${new Date(question.dateCreated).getMonth()}/${new Date(question.dateCreated).getDate()}/${new Date(question.dateCreated).getFullYear()}`}</p>
                <p>{displayTimeString()}</p>
                <p><Link to={`/question/${question.id}`}>Show</Link></p>
            </Card>
        </div>
    )
}
