import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Option from './Option';
import { setQuestions } from '../../redux/appDataSlice';
import { _getQuestions } from '../../database/Database';

const tdStyle = {
  padding: "10px"
}

export default function Question({ question_id }) {
  const allQuestions = useSelector((state) => state.app.appData);
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const dispatch = useDispatch();

  const question = () => {
    const allQuestionsObj = allQuestions[0];
    const allQuestionsObjKeys = Object.keys(allQuestionsObj);
    console.log(allQuestionsObjKeys);
    for (const key of allQuestionsObjKeys) {
      if (key === question_id) {
        console.log(allQuestionsObj[key])
        return allQuestionsObj[key];
      }
    }
    throw "Question not found";
  }

  const answered = () => {
    const answersOfUser = Object.keys(user.answers);
    console.log(answersOfUser);
    console.log(question_id);
    if (answersOfUser.includes(question_id)) {
      return true;
    }
    return false;
  }

  const votesFirstOption = () => {
    try {
      return question().optionOne.votes.length;
    } catch (err) {

    }
  }

  const votesSecondOption = () => {
    try {
      return question().optionTwo.votes.length;
    } catch (err) {

    }
  }

  return (
    <div>
      <div style={{ height: 20 }}></div>
      <center>
        <img src={require(`../../avatars/${question().author}.jpg`)} width={200} height={200}></img>
        <div>{question().author}</div>
        <h2>Would you rather</h2>
        <table>
          <tbody>
            <tr>
              <th align='center' colSpan={2} style={{ tdStyle }}>{question().text}</th>
            </tr>
            <tr>
              <td align='center' style={{ tdStyle }}>
                {<Option id={question().id} user={user} answered={answered()} optionName={"optionOne"} text={question().optionOne.text} votes={votesFirstOption()} totalVotes={votesFirstOption() + votesSecondOption()} />}
              </td>
              <td align='center' style={{ tdStyle }}>
                {<Option id={question().id} user={user} answered={answered()} optionName={"optionTwo"} text={question().optionTwo.text} votes={votesSecondOption()} totalVotes={votesFirstOption() + votesSecondOption()} />}
              </td>
            </tr>
          </tbody>
        </table>
      </center>

    </div>
  )
}
