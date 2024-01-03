import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuestionCard from '../question-components/QuestionCard';
import { _getQuestions, _getUsers } from '../../database/Database';
import { dateSortingFunction } from '../functions/ReusableFunctions';
import { setQuestions } from '../../redux/appDataSlice';
import { setUsers } from '../../redux/authSlice';

export default function Home() {
  const allQuestionsArray = useSelector((state) => state.app.appData);
  const usersArray = useSelector((state) => state.auth.authDetails);
  const dispatch = useDispatch();

  console.log(usersArray);
  const getAnsweredQustions = () => {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const users = usersArray[0];
    let updatedUser = {};
    for (const key in users) {
      if (key === user.id) {
        updatedUser = users[key];
      }
    }
    console.log(updatedUser);
    const userKeysArray = Object.keys(updatedUser);
    const questionsAnsweredByUser = [];
    for (const key of userKeysArray) {
      if (key === "answers") {
        for (const answer in updatedUser[key]) {
          questionsAnsweredByUser.push(answer);
        }
      }
    }
    console.log(questionsAnsweredByUser);
    return questionsAnsweredByUser;
  }

  /**
   * 
   * @param {Object} user 
   * @param {Array} allQuestions 
   * @returns "An array containing questions sorted as per date created, answered by the logged in user"
   */
  const questionsAnsweredByTheCurrentUser = () => {
    const answeredQuestions = getAnsweredQustions();
    const allQuestionsObj = allQuestionsArray[0];
    console.log(allQuestionsArray);
    let result = [];
    for (const key in allQuestionsObj) {
      for (const answer of answeredQuestions) {
        if (key === answer) {
          result.push(allQuestionsObj[key]);
        }
      }
    }
    if (result.length > 0) {
      result.sort(dateSortingFunction)
    }
    return result;
  }

  const questionsNotAnsweredByTheCurrentUser = () => {
    let result = [];
    const allQuestionsObj = allQuestionsArray[0];
    const answeredQuestions = getAnsweredQustions();
    console.log(answeredQuestions);
    for (const key in allQuestionsObj) {
      let count = 0;
      for (const answer of answeredQuestions) {
        if (answer !== key) {
          count++;
        }
      }
      if ( count === answeredQuestions.length) {
        result.push(allQuestionsObj[key]);
      }
    }
    console.log(result);
    if (result.length > 0) {
      result.sort(dateSortingFunction)
    }
    return result;
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) {
        alert("mounted, usEffect called")
        await _getQuestions().then((data) => dispatch(setQuestions(data)));
        await _getUsers().then((data) => dispatch(setUsers(data)));
      }
    }
    )();
    return () => mounted = false;
  }, [])

  return (
    <div style={{ alignContent: "center" }}>
      <center> <div className='vertical-gap' style={{ height: 10 }}>{ }</div>
        {questionsAnsweredByTheCurrentUser() && <table border={1} style={{ width: "70%" }}>
          <tbody>
            <tr>
              <th align='center' colSpan={questionsAnsweredByTheCurrentUser().length}>
                Answered
              </th>
            </tr>
            <tr>
              {questionsAnsweredByTheCurrentUser().map((question) =>
                <td key={question.id} align='center' style={{ padding: 20 }}>
                  <QuestionCard question={question} />
                </td>
              )}
            </tr>
          </tbody>
        </table>}
        <div className='vertical-gap' style={{ height: 50 }}>{ }</div>
        {questionsNotAnsweredByTheCurrentUser() && <table border={1} style={{ width: "70%" }}>
          <tbody>
            <tr>
              <th align='center' colSpan={questionsNotAnsweredByTheCurrentUser().length}>
                Un-Answered
              </th>
            </tr>
            <tr>
              {questionsNotAnsweredByTheCurrentUser().map((question) =>
                <td key={question.id} align='center' style={{ padding: 20 }}>
                  <QuestionCard question={question} />
                </td>
              )}
            </tr>
          </tbody>
        </table>}
      </center>
    </div>
  )
}
