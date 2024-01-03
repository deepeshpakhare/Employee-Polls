import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuestionCard from '../question-components/QuestionCard';
import { _getQuestions } from '../../database/Database';
import { dateSortingFunction } from '../functions/ReusableFunctions';
import { setQuestions } from '../../redux/appDataSlice';

export default function Home() {
  const allQuestionsArray = useSelector((state) => state.app.appData);
  const dispatch = useDispatch();

  const getAnsweredQustions = () => {
    const user = JSON.parse(localStorage.getItem("activeUser"));
    const userKeysArray = Object.keys(user);
    const questionsAnsweredByUser = [];
    for (const key of userKeysArray) {
      if (key === "answers") {
        for (const answer in user[key]) {
          questionsAnsweredByUser.push(answer);
        }
      }
    }
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
    for (const answer of answeredQuestions) {
      for (const key in allQuestionsObj) {
        if (answer !== key) {
           if (!result.includes(allQuestionsObj[key])) {
              result.push(allQuestionsObj[key]);
           }
        }
      }
    }
    if (result.length > 0) {
      result.sort(dateSortingFunction)
    }
    return result;
  }

  useEffect(() => {
    let mounted = true;
    (async() => {
      if (mounted) {
        await _getQuestions().then((data) => dispatch(setQuestions(data)));
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
