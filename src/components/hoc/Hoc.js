import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import { isLoggedIn } from "../Functions/ReusableFunctions"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { _getQuestions } from '../../database/Database';
import { setQuestions } from '../../redux/appDataSlice';
import Error from "../error/Error"
import { logOutSuccess } from '../../redux/authSlice';

export default function Hoc(Component) {
    const InnerComponent = () => {
        const { question_id } = useParams();
        const questionsObj = useSelector((state) => state.app.appData[0]);
        const dispatch = useDispatch();
        console.log("I am rendered");
        console.log(questionsObj);

        const isQuestionIdValid = () => {
            if (questionsObj) {
                const questionIds = Object.keys(questionsObj);
                for (const id of questionIds) {
                    if (id === question_id) {
                        return true;
                    }
                }
                return false;
            }
            return false;
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

        if (!question_id) {
            return (
                <>
                    <div>
                        {isLoggedIn() ? <div><Navbar /> <Component /></div> : <Login />}
                    </div>
                </>

            )
        } else {
            if (questionsObj !== "undefined") {
                if (isQuestionIdValid()) {
                    return (
                        <>
                            <div>
                                {isLoggedIn() ? <div><Navbar /> <Component question_id={question_id} /></div> : <Login />}
                            </div>
                        </>

                    )

                } else {
                    //alert("Entered");
                    return (
                        <>
                            <div>
                                {isLoggedIn() ? <Error /> : <Login />}
                            </div>
                        </>

                    )
                }
            }
        }
    }
    return <div><InnerComponent /></div>;
}
