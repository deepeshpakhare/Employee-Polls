import React from "react";
import Login from "./Login";
import renderer from "react-test-renderer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import  store  from '../../redux/store';

test("Login spanpshot test", () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
    ])
    const component = renderer.create(
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});