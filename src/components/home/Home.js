import React, { useEffect } from 'react';
import { getAllQuestions } from '../../api/Api';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions } from '../../redux/appDataSlice';
import { Table } from 'antd';
import QuestionCard from '../question-components/QuestionCard';

export default function Home() {
  const allQuestions = useSelector((state) => state.app.appData);
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


  return (
    <div>
      {allQuestions &&
        <table style={{textAlign:"center"}}>
          <th>
            Answered
          </th>
          <tr>
            {allQuestions.map((question) =>
              <td>
                <QuestionCard key={question.id} askedBy={question.askedBy} createdAt={question.created} />
              </td>
            )}
          </tr>

        </table>
      }
    </div>
  )
}
