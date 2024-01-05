import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { _getQuestions, _getUsers } from '../../database/Database';
import { setUsers } from '../../redux/authSlice';
import { setQuestions } from '../../redux/appDataSlice';

export default function Leaderboard() {
  const users = useSelector((state) => state.auth.authDetails[0]);
  const questions = useSelector((state) => state.app.appData[0]);
  const dispatch = useDispatch();

  const dataSource = () => {
    const result = [];
    const userKeys = Object.keys(users);
    const questionKeys = Object.keys(questions);
    console.log(questionKeys);
    for (const userKey of userKeys) {
      let user = users[userKey];
      let count = 0;
      for (const questionKey of questionKeys) {
        if (user.id === questions[questionKey].author) {
          count++;
        }
      }
      let tempObj = {
        key: user.id,
        avatar: user.avatarURL,
        name: user.name,
        answered: Object.keys(user.answers).length,
        created: count,
      }
      result.push(tempObj);
      tempObj = {};
    }
    result.sort((a,b) => {
      const totalOfA = a.answered + a.created;
      const totalOfB = b.answered + b.created;
      if (totalOfA < totalOfB ) {
        return 1;
      } else if (totalOfA > totalOfB) {
        return -1;
      } else {
        return 0;
      }
    })
    return result;
  }

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <div><img src={require(`../../avatars/${text}`)} width={70} height={70}></img></div>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Answerd',
      dataIndex: 'answered',
      key: 'answered',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) {
        await _getUsers().then((data) => dispatch(setUsers(data)));
        await _getQuestions().then((data) => dispatch(setQuestions(data)));
      }
    }
    )();
    return () => mounted = false;
  }, [])

  return (
    <div>
      <div style={{ height: 10 }}></div>
      <center>
        {users && <Table dataSource={questions && dataSource()} columns={columns} />};
      </center>
    </div>
  )
}
