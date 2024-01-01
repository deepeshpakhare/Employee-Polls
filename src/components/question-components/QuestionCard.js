import React from 'react';
import { Card,Button } from 'antd';
import { Link } from 'react-router-dom';

export default function QuestionCard({ question }) {
    return (
        <div>
            <Card title={question.askedBy}>
                <p>{question.dateCreated}</p>
                <p><Link to={`/question/${question.id}`}>Show</Link></p>
            </Card>
        </div>
    )
}
