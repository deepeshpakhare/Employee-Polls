import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Option from './Option';

const tdStyle = {
  padding: "10px"
}

export default function Question({ question_id }) {
  const allQuestions = useSelector((state) => state.app.appData);
  const user = JSON.parse(localStorage.getItem("activeUser"));

  const question = () => {
    const allQuestionsObj = allQuestions[0];
    for (const key in allQuestionsObj) {
      if ( key === question_id) {
          console.log(allQuestionsObj[key])
          return allQuestionsObj[key];
      }
    }
    return new Error("Question not found");
  }

  const answered = () => {
    const answersOfUser = Object.keys(user.answers);
    console.log(answersOfUser);
    console.log(question_id);
    if(answersOfUser.includes(question_id)){
      return true;
    }
    return false;
  }

  const votesFirstOption =  question().optionOne.votes.length;
  const votesSecondOption = question().optionTwo.votes.length;

  return (
    <div>
      <div style={{height:20}}></div>
      <center>
        <img src={require(`../../avatars/${question().author}.jpg`)} width={200} height={200}></img>
        <table>
          <tbody>
            <tr>
              <th align='center' colSpan={2} style={{tdStyle}}>{question().text}</th>
            </tr>
            <tr>
              <td align='center' style={{tdStyle}}>
                {<Option id={question().id} user={user}  answered={answered()} optionName={"optionOne"} text={question().optionOne.text}  votes={votesFirstOption} totalVotes={votesFirstOption + votesSecondOption}/>}
              </td>
              <td align='center' style={{tdStyle}}>
                {<Option id={question().id} user={user}  answered={answered()} optionName={"optionTwo"} text={question().optionTwo.text}  votes={votesSecondOption} totalVotes={votesFirstOption + votesSecondOption}/>}
              </td>
            </tr>
          </tbody>
        </table>
      </center>

    </div>
  )
}
