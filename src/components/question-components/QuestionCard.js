import React from 'react';
import { Card,Button } from 'antd';

export default function QuestionCard({ askedBy, createdAt}) {
    return (
        <div>
            <Card title={askedBy} bordered={false}>
                <p>{createdAt.time}</p>
                <p>{createdAt.date}</p>
            </Card>
        </div>
    )
}