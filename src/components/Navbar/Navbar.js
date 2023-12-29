import React, { useState } from 'react';
import { Menu, Flex, Space } from 'antd';
import { Link } from "react-router-dom";

const blankObject = {};
const user = JSON.parse(localStorage.getItem("activeUser"));
const avatar = require(`../../avatars/${user.avatar}`);
const labelStyle = {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    color: "green",
    gap: 1,
}


const items = [
    {
        label: (
            <Space
                direction="vertical"
                size="large"
                style={{
                    display: 'flex',
                }}
            > <Link to={"/home"}>Home</Link>
            </Space>
        ),
        key: "home"
    },
    {
        label: (
            <Space
                direction="vertical"
                size="large"
                style={{
                    display: 'flex',
                }}
            >   <Link to={"/leaderboard"}>Leaderboard</Link>
            </Space>
        ),
        key: "leaderboard"
    },
    {
        label: "New",
        key: "new"
    },
    blankObject,
    blankObject,
    blankObject,
    blankObject,
    {
        label: (
            <div style={labelStyle}>
                <img
                    src={avatar}
                    width={20}
                    height={20}
                />
                <h3>{user.username}</h3></div> 
        ),
        key: "user"
    },
    {
        label: "Logout",
        key: "logout"
    }
]
export default function Navbar() {
    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
    )
}
