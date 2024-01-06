import { isLoggedIn } from "./ReusableFunctions";
import { dateSortingFunction } from "./ReusableFunctions";
import { getAnsweredQustions } from "./ReusableFunctions";
import { users } from "../../database/Database";

//tests for isLoggedIn()
test("returns to be truthy", () => {
    localStorage.setItem("activeUser", "sarahedo");
    expect(isLoggedIn()).toBeTruthy();
});

test("returns to be falsy", () => {
    localStorage.removeItem("activeUser");
    expect(isLoggedIn()).toBeFalsy();
});

//tests for dateSortingFunctoion()
test("returns 1", () => {
    expect(dateSortingFunction(
        { timestamp: 1467166872630 }, { timestamp: 1467166872634 })
    ).toBe(1);
});

test("returns -1", () => {
    expect(dateSortingFunction(
        { timestamp: 1467166872638 }, { timestamp: 1467166872634 })
    ).toBe(-1);
});

test("returns 0", () => {
    expect(dateSortingFunction(
        { timestamp: 1467166872634 }, { timestamp: 1467166872634 })
    ).toBe(0);
});

//test for getAnsweredQuestions()
test("returns an array of answers' ids answered by logged in user", () => {
    localStorage.setItem("activeUser", JSON.stringify({
        id: 'sarahedo',
        password: 'password123',
        name: 'Sarah Edo',
        avatarURL: "sarahedo.jpg",
        answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    }));
    expect(getAnsweredQustions(users)).toEqual(expect.arrayContaining([
        "8xf0y6ziyjabvozdd253nd",
        "6ni6ok3ym7mf1p33lnez",
        "am8ehyc8byjqgar0jgpub9",
        "loxhs1bqm25b708cmbf3g"
    ]))
})