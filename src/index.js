import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import  store  from './redux/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login/Login';
import Hoc from './components/hoc/Hoc';
import Home from './components/home/Home';
import Leaderboard from './components/leaderbord/Leaderboard';
import Logout from './components/logout/Logout';
import AddQuestion from './components/question-components/AddQuestion';
import Question from './components/question-components/Question';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "home",
    element: Hoc(Home),
  },
  {
    path: "leaderboard",
    element: Hoc(Leaderboard),
  },
  {
    path: "addQuestion",
    element: Hoc(AddQuestion),
  },
  {
    path: "question/:question_id",
    element: Hoc(Question),
  },
  {
    path: "logout",
    element: <Logout/>,
  },
]);

console.log = () => {};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
