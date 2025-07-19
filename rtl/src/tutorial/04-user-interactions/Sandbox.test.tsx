import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";
import userEvent from "@testing-library/user-event";

describe("user-interactions", () => {
  test("should increment and decrement count", async () => {
    render(<Sandbox />);

    const user = userEvent.setup();

    const increaseButton = screen.getByRole("button", {
      name: "Increase",
    });
    const decreaseButton = screen.getByRole("button", {
      name: "Decrease",
    });

    expect(increaseButton).toBeInTheDocument();
    expect(decreaseButton).toBeInTheDocument();

    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    await user.click(increaseButton);
    await user.click(increaseButton);
    expect(screen.getByText(/count: 2/i)).toBeInTheDocument();
    await user.click(decreaseButton);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });

  test("should toggle between like and dislike", async () => {
    render(<Sandbox />);

    const user = userEvent.setup();

    const unlikeButton = screen.getByRole("button", {
      name: "unlike button",
    });
    expect(unlikeButton).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "like button" })
    ).not.toBeInTheDocument();

    await user.click(unlikeButton);
    const likeButton = screen.getByRole("button", { name: "like button" });
    expect(likeButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "unlike button" })
    ).not.toBeInTheDocument();
  });
});
