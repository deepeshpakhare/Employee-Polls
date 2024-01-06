import { fireEvent, render, screen } from "@testing-library/react";
import AddQuestion from "./AddQuestion";
import { MemoryRouter } from "react-router-dom";


test("ability to type in input", async () => {
    render(
        <MemoryRouter>
            <AddQuestion />
        </MemoryRouter>
    )
    const inputElement = screen.getByPlaceholderText(/option One/i);
    fireEvent.change(inputElement, { target: { value: "some option" } });
    expect(inputElement.value).toBe("some option");
});