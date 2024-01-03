import React from 'react';
import { useSelector } from 'react-redux';
import Option from './Option';

const tdStyle = {
  padding: "10px"
}

export default function Question({ question_id }) {
  const allQuestions = useSelector((state) => state.app.appData);

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
    const answersOfUser = Object.keys(question().answers);
    if(answersOfUser.includes(question_id)){
      return true;
    }
    return false;
  }

  const user = JSON.parse(localStorage.getItem("activeUser"));
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
                {<Option id={question().id} user={user}  optionName={"firstOption"} text={question().optionOne.text} answered={answered} votes={votesFirstOption} totalVotes={votesFirstOption + votesSecondOption}/>}
              </td>
              <td align='center' style={{tdStyle}}>
                {<Option id={question().id} user={user}  optionName={"secondOption"} text={question().optionTwo.text} answered={answered} votes={votesSecondOption} totalVotes={votesFirstOption + votesSecondOption}/>}
              </td>
            </tr>
          </tbody>
        </table>
      </center>

    </div>
  )
}
