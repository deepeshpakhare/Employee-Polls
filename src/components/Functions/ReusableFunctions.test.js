import { isLoggedIn } from "./ReusableFunctions";
import { dateSortingFunction } from "./ReusableFunctions";

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
})

test("returns -1", () => {
    expect(dateSortingFunction(
        { timestamp: 1467166872638 }, { timestamp: 1467166872634 })
    ).toBe(-1);
})

test("returns 0", () => {
    expect(dateSortingFunction(
        { timestamp: 1467166872634 }, { timestamp: 1467166872634 })
    ).toBe(0);
})