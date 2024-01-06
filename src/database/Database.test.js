import { _saveQuestion } from "./Database";
import { _saveQuestionAnswer } from "./Database";


// _saveQuestion() test
const question = {
    optionOneText: "choose monolithic architecture",
    optionTwoText: "choose microservices architecture",
    author: "sarahedo"
}

test(`the result is ${question}`, async () => {
    const result = await _saveQuestion(question);
    const toTest = {
        optionOneText: result.optionOne.text,
        optionTwoText: result.optionTwo.text,
        author: result.author,
    }
    expect(toTest).toStrictEqual(question);
}
);

test('the fetch fails with a message Please provide optionOneText, optionTwoText, and author', async () => {
    await expect(_saveQuestion({ author: "sarahedo" })).rejects.toMatch('Please provide optionOneText, optionTwoText, and author');
});


//_saveQuestionAnswer() test
test("the result is a true value", async () => {
    await expect(_saveQuestionAnswer({ authedUser: "sarahedo", qid: "vthrdm985a262al8qx3do", answer: "optionOne" })).resolves.toBeTruthy();
}
);

test('the fetch fails with a false value', async () => {
    await expect(_saveQuestionAnswer({ authedUser: "sarahedo" })).rejects.toMatch("Please provide authedUser, qid, and answer");
});