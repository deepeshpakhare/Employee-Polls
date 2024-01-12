import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuestionCard from '../question-components/QuestionCard';
import { _getQuestions, _getUsers } from '../../database/Database';
import { dateSortingFunction } from '../Functions/ReusableFunctions';
import { setQuestions } from '../../redux/appDataSlice';
import { logOutSuccess, setUsers } from '../../redux/authSlice';
import { getAnsweredQustions } from '../Functions/ReusableFunctions';
import { Radio } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Home() {
  const allQuestionsArray = useSelector((state) => state.app.appData);
  const users = useSelector((state) => state.auth.authDetails[0]);
  const dispatch = useDispatch();
  const [value, setValue] = useState("answered");
  const [title, setTitle] = useState("Answered");
  const [answersArray, setAnswersArray] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const state = useLocation().state;
  console.log(state);
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
      if (count === answeredQuestions.length) {
        result.push(allQuestionsObj[key]);
      }
    }
    console.log(result);
    if (result.length > 0) {
      result.sort(dateSortingFunction)
    }
    return result;
  }

  /**
 * @description "Called when radio button is selected"
 * @param {event} e 
 */
  const onRadioChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "unanswered") {
      setAnswersArray(questionsNotAnsweredByTheCurrentUser());
      setTitle("Un-Answered");
    } else {
      setAnswersArray(questionsAnsweredByTheCurrentUser());
      setTitle("Answered");
    }
  };

  useEffect(() => {
    console.log(location);
    /*if(location.key !== localStorage.getItem("locationKey")) {
      localStorage.setItem("locationKey",location.key);
    } else {
      dispatch(logOutSuccess());
      navigate("/");
      return;
    }*/
    if (!location.state && !state && !localStorage.getItem("path")) {
      localStorage.setItem("path",window.location.pathname);
      dispatch(logOutSuccess());
    }
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
        <div>
          <Radio.Group onChange={(e) => onRadioChange(e)} value={value}>
            <Radio value={"answered"}>Answered</Radio>
            <Radio value={"unanswered"}>Un-Answered</Radio>
          </Radio.Group>
        </div>
        <div className='vertical-gap' style={{ height: 40 }}>{ }</div>
        {answersArray && <table border={1} style={{ width: "70%" }}>
          <tbody>
            <tr>
              <th align='center' colSpan={answersArray.length > 0 ? answersArray.length: questionsAnsweredByTheCurrentUser().length}>
                {title}
              </th>
            </tr>
            <tr>
              {answersArray.length > 0 ? answersArray.map((question) =>
                <td key={question.id} align='center' style={{ padding: 20 }}>
                  <QuestionCard question={question} />
                </td>
              ) : questionsAnsweredByTheCurrentUser().map((question) =>
                <td key={question.id} align='center' style={{ padding: 20 }}>
                  <QuestionCard question={question} />
                </td>
              )}
            </tr>
          </tbody>
        </table>}
        {/* <div className='vertical-gap' style={{ height: 50 }}>{ }</div>
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
              </table>*/}
      </center>
    </div>
  )
}
