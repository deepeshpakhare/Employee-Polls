import React from 'react';
import { useSelector } from 'react-redux';
import Option from './Option';
import { getCurrentUser } from '../functions/ReusableFunctions';

const tdStyle = {
  padding: "10px"
}

export default function Question({ question_id }) {
  const allQuestions = useSelector((state) => state.app.appData);
  const users = useSelector((state) => state.auth.authDetails);

  const question = () => allQuestions.filter((question) => question.id == question_id)[0];
  const currentUser = getCurrentUser(users);
  const answered = question().answeredBy.filter((obj) => obj.name === currentUser.username).length > 0 ? true : false;
  const votesFirstOption =  question().answeredBy.reduce((acc,curr)=>curr.answer === "firstOption"? acc + 1:acc,0);
  const votesSecondOption = question().answeredBy.reduce((acc,curr)=>curr.answer === "secondOption"? acc + 1:acc,0);
  
  return (
    <div>
      <div style={{height:20}}></div>
      <center>
        <table>
          <tbody>
            <tr>
              <th align='center' colSpan={2} style={{tdStyle}}>{question().text}</th>
            </tr>
            <tr>
              <td align='center' style={{tdStyle}}>
                {<Option id={question().id} user={currentUser} optionName={"firstOption"} text={question().firstOption} answered={answered} votes={votesFirstOption} totalVotes={votesFirstOption + votesSecondOption}/>}
              </td>
              <td align='center' style={{tdStyle}}>
                {<Option id={question().id} user={currentUser} optionName={"secondOption"} text={question().secondOption} answered={answered} votes={votesSecondOption} totalVotes={votesFirstOption + votesSecondOption}/>}
              </td>
            </tr>
          </tbody>
        </table>
      </center>

    </div>
  )
}
