import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import Form from "../components/Form";

export const getFormElements = () => {
  return {
    input: screen.getByRole("textbox", {
      name: /title/i,
    }),
    button: screen.getByRole("button", {
      name: /add post/i,
    }),
  };
};

describe("Form", () => {
  const mockOnSubmit = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    mockOnSubmit.mockClear();

    render(<Form onSubmit={mockOnSubmit} />);
  });

  test("renders correctly", () => {
    const { input, button } = getFormElements();

    expect(input).toHaveValue("");
    expect(button).toBeInTheDocument();
  });

  test("updates input value on change", async () => {
    const { input } = getFormElements();
    const inputValue = "Test Post";

    await user.type(input, inputValue);

    expect(input).toHaveValue(inputValue);
  });

  test("requires title input before submission", async () => {
    const { button } = getFormElements();

    await user.click(button);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("submits the form with correct data", async () => {
    const { input, button } = getFormElements();

    const inputValue = "Test Post";
    await user.type(input, inputValue);
    await user.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: inputValue,
      likes: 0,
    });
  });

  test("clears input after submission", async () => {
    const { input, button } = getFormElements();

    const inputValue = "Test Post";
    await user.type(input, inputValue);
    await user.click(button);

    expect(input).toHaveValue("");
  });
});
