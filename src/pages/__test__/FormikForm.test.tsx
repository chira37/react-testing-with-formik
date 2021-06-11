import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import renderer from "react-test-renderer";

import FormikForm from "../FormikForm";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

it("render without crash", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FormikForm title="TEST" />, div);
});

it("render FormikForm correctly", () => {
    const { getByTestId } = render(<FormikForm title="TESTS" />);
    expect(getByTestId("form_title")).toHaveTextContent("TEST");
});

it("match snapshot", () => {
    const tree = renderer.create(<FormikForm title="TESTS"/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("check input validation errors", async () => {
    const { getByTestId, queryByText, debug } = render(<FormikForm title="TESTS" />);
    const submitButton = getByTestId("submit_button");

    await act(async () => {
        userEvent.click(submitButton);
    });

    expect(queryByText("email is a required field")).not.toBeNull();
    expect(queryByText("username is a required field")).not.toBeNull();
    expect(queryByText("mobile is a required field")).not.toBeNull();
    expect(queryByText("password is a required field")).not.toBeNull();
    debug();
});

test("check input validation success", async () => {
    const { getByTestId, queryAllByText, getByLabelText, debug } = render(<FormikForm title="TESTS" />);
    const submitButton = getByTestId("submit_button");

    await act(async () => {
        fireEvent.change(getByLabelText("Email"), { target: { value: "test@gmail.com" } });
        fireEvent.change(getByLabelText("Username"), { target: { value: "test" } });
        fireEvent.change(getByLabelText("Mobile"), { target: { value: "12345678891" } });
        fireEvent.change(getByLabelText("Password"), { target: { value: "121232142143" } });
    });

    await act(async () => {
        fireEvent.click(submitButton);
    });

    const validationErrors = queryAllByText("required", { exact: false });
    expect(validationErrors).toEqual([]);
    //debug();
});
