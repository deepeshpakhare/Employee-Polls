import React, { useState } from 'react';
import { Menu, Space, } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logOutSuccess } from '../../redux/authSlice';

const blankObject = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

const imageStyle = {
    position: "absolute",
    marginLeft: 20,
}

const usernameStyle = {
    paddingTop: 15,
}


export default function Navbar() {
    const [current, setCurrent] = useState('home');
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const avatar = user ? require(`../../avatars/${user.avatar}`) : null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            label: (
                <Space
                    direction="vertical"
                    size="large"
                    style={{
                        display: 'flex',
                    }}
                >   <Link to={"/addQuestion"}>New</Link>
                </Space>
            ),
            key: "new"
        },
        ...blankObject,
        {
            label: (
                <div>
                    <img
                        src={avatar}
                        width={30}
                        height={30}
                        style={imageStyle}
                    />
                    <h3 style={usernameStyle}>{user && user.username}</h3></div>
            ),
            key: "user"
        },
        {
            label: (
                <div style={usernameStyle}>
                    Logout
                </div>
            ),
            key: "logout"
        }
    ]


    const handleLogOut = () => {
        dispatch(logOutSuccess(JSON.parse(localStorage.getItem("activeUser"))));
        navigate("/logout");
    }

    const onClick = (e) => {
        setCurrent(e.key);
        if (e.key === "logout") {
            handleLogOut();
        }
    };

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </div>
    )
}
