import userEvent, { UserEvent } from "@testing-library/user-event";
import App from "../App";
import { render, screen } from "@testing-library/react";

const getElements = () => ({
  titleInput: screen.getByRole("textbox", { name: /title/i }),
  descriptionInput: screen.getByRole("textbox", { name: /description/i }),
  categorySelect: screen.getByRole("combobox", { name: /category/i }),
  submitButton: screen.getByRole("button", { name: /add task/i }),
});

const addItem = async (user: UserEvent) => {
  const { categorySelect, descriptionInput, submitButton, titleInput } =
    getElements();

  await user.type(titleInput, "Test item");
  await user.type(descriptionInput, "Test content");
  await user.selectOptions(categorySelect, "urgent");
  await user.click(submitButton);
};

describe("Form and list integration test", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    render(<App />);
  });

  test("render heading and form elements", () => {
    const heading = screen.getByText(/focus flow/i);
    expect(heading).toBeInTheDocument();

    const elements = getElements();
    Object.values(elements).forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    const cards = screen.queryAllByRole("article");
    expect(cards).toHaveLength(0);
  });

  test("handles add an item", async () => {
    const cards = screen.queryAllByRole("article");
    expect(cards).toHaveLength(0);

    await addItem(user);
    const cardsWithItem = await screen.findAllByRole("article");
    expect(cardsWithItem).toHaveLength(1);
    expect(screen.getByText("Test item")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
  });

  test("handles deleting an item", async () => {
    await addItem(user);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);

    expect(screen.queryByText("Test Item")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
