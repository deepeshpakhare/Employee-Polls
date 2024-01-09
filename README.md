# Project Description

The project is a poll application for employees of a software company.
The employees are imporsonated/mocked to demonstrate the functioning. 
Upon landing the login page, you can select an employee to log in.
After logging in, the home page is shown where poll questions are arranged in "answered" and "unanswered" categories.
User can click on "show" link on the question to go to the question's details page.
For unanswered questions, the user can click the option of his/her choice and the vote gets recorded and the question now falls in answered categorie if user navigates to home page. 
The "new" option in the navigation bar navigates user to the page of adding a new question.
Upon filling the add question form, and clicking the submit button, the question is added to the database. 
You can see this newly added question in unanswered categorie on home page.
The leaderboard option on navigation bar takes user to the leaderboard page where the employees are arranged according to descending order of the total of asked and answered questions. This leaderboard is updated whenever there is change in the questions stats. 
User can log out by clicking the logout option on navigation bar.
A user has to be logged in at all times to access the various pages and functionalities of the application. If a user is not logged in and tries to access any page then he is directed to login page automatically.


### `Clone the project`

You can run the command, "git clone https://github.com/deepeshpakhare/Employee-Polls.git" to clone the repository to your local machine.

### `Deployed URL`

You can access the application by hitting the URL: https://employee-polls-rose.vercel.app/ in the browser of your choice.

## Available Scripts

In the project directory, you can run:

### `npm install`

You can run this command in the project's root directory to download the dependencies of the project to run the cloned project on your local machine.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
