import React, { useEffect, useState } from 'react';
import { getAllQuestions } from '../../api/Api';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions } from '../../redux/appDataSlice';
import QuestionCard from '../question-components/QuestionCard';

export default function Home() {
  const allQuestions = useSelector((state) => state.app.appData);
  const users = useSelector((state) => state.auth.authDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) {
        await getAllQuestions().then((data) => dispatch(setQuestions(data)));
      }
    })();
    return () => mounted = false;
  }, [])

  /**
   * 
   * @param {Array} users 
   * @returns "The user who is logged in else Error"
   */
  const getCurrentUser = (users) => {
    for (let user of users) {
      if (user.loggedIn) {
        return user;
      }
    }
    return Error("Error in logged in user");
  }

  /**
   * 
   * @param {Object} user 
   * @param {Array} allQuestions 
   * @returns "An array containing questions sorted as per date created, answered by the logged in user"
   */
  const getQuestionsAnsweredByTheCurrentUser = () => {
    const user = getCurrentUser(users);
    let result = [];
    for (let question of allQuestions) {
      for (let answeredUser of question.answeredBy) {
        console.log(user.username);
        if (answeredUser.name === user.username) {
          result.push(question)
        }
      }
    }
    //console.log(result);
    if (result.length > 0) {
      result.sort((a, b) => {
        if (new Date(a.dateCreated) < new Date(b.dateCreated)) {
          return 1;
        } else if (new Date(a.dateCreated) > new Date(b.dateCreated)) {
          return -1;
        }
        return 0;
      })
    }
    return result;
  }

  const getQuestionsNotAnsweredByTheCurrentUser = () => {
    const user = getCurrentUser(users);
    let result = [];
    for (let question of allQuestions) {
      let count = 0;
      for (let answeredUser of question.answeredBy) {
        console.log(user.username);
        if (answeredUser.name !== user.username) {
          count++;
        }
      }
      if (count === question.answeredBy.length) {
        result.push(question);
      }
    }
    console.log(result);
    if (result.length > 0) {
      result.sort((a, b) => {
        if (new Date(a.dateCreated) < new Date(b.dateCreated)) {
          return 1;
        } else if (new Date(a.dateCreated) > new Date(b.dateCreated)) {
          return -1;
        }
        return 0;
      })
    }
    return result;
  }

  return (
    <div style={{ alignContent: "center" }}>
      <center> <div className='vertical-gap' style={{ height: 10 }}>{ }</div>
        <table border={1} style={{ width: "70%" }}>
          <tbody>
            <tr>
              <th align='center' colSpan={getQuestionsAnsweredByTheCurrentUser().length}>
                Answered
              </th>
            </tr>
            <tr>
              {getQuestionsAnsweredByTheCurrentUser().map((question) =>
                <td key={question.id} align='center' style={{ padding: 20 }}>
                  <QuestionCard question={question} />
                </td>
              )}
            </tr>
          </tbody>
        </table>
        <div className='vertical-gap' style={{ height: 50 }}>{ }</div>
        <table border={1} style={{ width: "70%" }}>
          <tbody>
            <tr>
              <th align='center' colSpan={getQuestionsNotAnsweredByTheCurrentUser().length}>
                Un-Answered
              </th>
            </tr>
            <tr>
              {getQuestionsNotAnsweredByTheCurrentUser().map((question) =>
                <td key={question.id} align='center' style={{ padding: 20 }}>
                  <QuestionCard question={question} />
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </center>

    </div>
  )
}
