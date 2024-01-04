import React from 'react';
import { Card, Button } from 'antd';
import { _getQuestions, _getUsers, _saveQuestionAnswer } from '../../database/Database';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../redux/authSlice';
import { getAnsweredQustions } from '../functions/ReusableFunctions';
import { setQuestions } from '../../redux/appDataSlice';

export default function Option({ id, text, user, answered, votes, totalVotes, optionName }) {
    const users= useSelector((state) => state.auth.authDetails[0]);
    const allQestionsObj = useSelector((state) => state.app.appData[0]);
    const dispatch = useDispatch();

    const handleOptionClick = async (e) => {
        console.log(optionName);
        await _saveQuestionAnswer({ authedUser: user.id, qid: id, answer: optionName }).then((res) => console.log(res))
            .catch((error) => console.log(error));
        await _getUsers().then((data) => dispatch(setUsers(data)));
        await _getQuestions().then((data) => dispatch(setQuestions(data)));
    }

    const answeredNow = () => {
        const answeredQuetions = getAnsweredQustions(users);
        const found = answeredQuetions.find((questionId) => questionId === id);
        console.log(found);
        if (found) {
            return true;
        }
        return false;
    }

    const alreadyVoted = () => {
        const questions = Object.keys(allQestionsObj);
        for (const questionId of questions) {
            if (questionId === id) {
                if (allQestionsObj[questionId].optionOne.votes.includes(user.id)) {
                    if(optionName === "optionOne") {
                        return true;
                    }
                }
                if(allQestionsObj[questionId].optionTwo.votes.includes(user.id)) {
                    if(optionName === "optionTwo") {
                        return true;
                    }
                }
            }
        }
        return false;
    } 

    const getVotes = () => {
        const questions = Object.keys(allQestionsObj);
        let votes = 0;
        for (const questionId of questions) {
            if (questionId === id) {
                if (optionName === "optionOne") {
                    votes = allQestionsObj[questionId].optionOne.votes.length;
                }else {
                    votes = allQestionsObj[questionId].optionTwo.votes.length;
                }
            }
        }
        return votes;
    }

    /**
     * @description "Calculates total votes"
     * @returns {number}
     */
    const getTotalVotes = () => {
        const questions = Object.keys(allQestionsObj);
        let votes = 0;
        for (const questionId of questions) {
            if (questionId === id) {
                votes = allQestionsObj[questionId].optionOne.votes.length 
                + allQestionsObj[questionId].optionTwo.votes.length;
            }
        }
        return votes;
    }

    if (answered || answeredNow()) {
        return (
            <div>
                <Card title={text} style={alreadyVoted()?{border:"2px solid green"}:{color:"2px solid black"}}>
                    <p>Votes:{answered ? votes:getVotes()}</p>
                    <p>Percentage:{answered ?(votes / totalVotes * 100).toFixed(2):(getVotes()/getTotalVotes() * 100).toFixed(2)}%</p>
                    {alreadyVoted() ? <p>You voted for this option</p> : <p style={{ height: 20 }}></p>}
                </Card>
            </div>
        ) 
    }

    return (
        <div>
            <Card title={text}>
                <p><Button type='primary' onClick={(e) => handleOptionClick(e)}>Click To Vote</Button></p>
            </Card>
        </div>
    )

}
