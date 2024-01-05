import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Option from './Option';
import { _getQuestions } from '../../database/Database';
import { setQuestions } from '../../redux/appDataSlice';

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
      if (allQuestions) {
        return question().optionOne.votes.length;
      }
    } catch (err) {

    }
  }

  const votesSecondOption = () => {
    try {
      if (allQuestions) {
        return question().optionTwo.votes.length;
      }
    } catch (err) {

    }
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) {
        await _getQuestions().then((data) => dispatch(setQuestions(data)));
      }
    }
    )();
    return () => mounted = false;
  }, [])

  return (
    <div>
      <div style={{ height: 20 }}></div>
      <center>
        <img src={require(`../../avatars/${allQuestions && question().author}.jpg`)} width={200} height={200}></img>
        <div>{allQuestions && question().author}</div>
        <h2>Would you rather</h2>
        <table>
          <tbody>
            <tr>
              <th align='center' colSpan={2} style={{ tdStyle }}>{allQuestions && question().text}</th>
            </tr>
            <tr>
              <td align='center' style={{ tdStyle }}>
                {<Option id={allQuestions && question().id} user={user} answered={answered()} optionName={"optionOne"} text={allQuestions && question().optionOne.text} votes={votesFirstOption()} totalVotes={votesFirstOption() + votesSecondOption()} />}
              </td>
              <td align='center' style={{ tdStyle }}>
                {<Option id={allQuestions && question().id} user={user} answered={answered()} optionName={"optionTwo"} text={allQuestions && question().optionTwo.text} votes={votesSecondOption()} totalVotes={votesFirstOption() + votesSecondOption()} />}
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  )
}
