import { _saveQuestion } from "./Database";

const question = {
    optionOneText: "choose monolithic architecture",
    optionTwoText: "choose microservices architecture",
    author: "sarahedo"
}

test(`the data is ${question}`, async () => {
    const data = await _saveQuestion(question);
    const toTest = {
        optionOneText: data.optionOne.text,
        optionTwoText: data.optionTwo.text,
        author: data.author,
    }
    expect(toTest).toStrictEqual(question);
}
);

test('the fetch fails with a message Please provide optionOneText, optionTwoText, and author', async () => {
    await expect(_saveQuestion({author:"sarahedo"})).rejects.toMatch('Please provide optionOneText, optionTwoText, and author');
});