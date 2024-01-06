import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuestionCard from '../question-components/QuestionCard';
import { _getQuestions, _getUsers } from '../../database/Database';
import { dateSortingFunction } from '../Functions/ReusableFunctions';
import { setQuestions } from '../../redux/appDataSlice';
import { setUsers } from '../../redux/authSlice';
import { getAnsweredQustions } from '../Functions/ReusableFunctions';

export default function Home() {
  const allQuestionsArray = useSelector((state) => state.app.appData);
  const users = useSelector((state) => state.auth.authDetails[0]);
  const dispatch = useDispatch();

  /**
   * 
   * 
   * @description "The function returns an array of question objects
   * that have been answered by the logged in user"
   * @returns {array} 
   */
  const questionsAnsweredByTheCurrentUser = () => {
    const answeredQuestions = getAnsweredQustions(users);
    console.log(answeredQuestions);
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

  /**
   * @description "The function returns an array of question objects
   * that have not been answered by the logged in user"
   * @returns {array}
   */
  const questionsNotAnsweredByTheCurrentUser = () => {
    let result = [];
    const allQuestionsObj = allQuestionsArray[0];
    const answeredQuestions = getAnsweredQustions(users);
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
                <td key={question.id} align='center' style={{ padding: 20}}>
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
