import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("search-by-text", () => {
  it("should render the texts", async () => {
    render(<Sandbox />);

    const headingText = screen.getByText("React Testing Library Examples");
    expect(headingText).toBeInTheDocument();

    const phoneText = screen.getByText(/\d{3}-\d{3}-\d{4}/);
    expect(phoneText).toBeInTheDocument();

    const errorMessage = screen.queryByText("Error message");
    expect(errorMessage).not.toBeInTheDocument();

    const itemList = screen.getAllByText("Item 1");
    expect(itemList).toHaveLength(3);

    const asyncMessage = await screen.findByText("Async message");
    expect(asyncMessage).toBeInTheDocument();
  });
});
