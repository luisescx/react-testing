import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe("Sandbox Component", () => {
  test("renders nav and  navigation links", () => {
    render(<Sandbox />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  test("renders headings with correct hierarchy", () => {
    render(<Sandbox />);

    expect(
      screen.getByRole("heading", { name: "Main Heading", level: 1 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Subheading", level: 2 })
    ).toBeInTheDocument();
  });

  test("renders image with alt text", () => {
    render(<Sandbox />);

    // expect(screen.getByRole('img', { name: 'Example' })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /example/i })).toHaveAttribute(
      "src",
      "example.jpg"
    );
  });

  test("renders list", () => {
    render(<Sandbox />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("renders cards", () => {
    render(<Sandbox />);
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  test("renders initial buttons", () => {
    render(<Sandbox />);

    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  test("error button is not initially visible", () => {
    render(<Sandbox />);

    expect(
      screen.queryByRole("button", { name: "Error" })
    ).not.toBeInTheDocument();
  });

  test("async button appears after delay", async () => {
    render(<Sandbox />);

    expect(
      screen.queryByRole("button", { name: "Async Button" })
    ).not.toBeInTheDocument();

    const asyncButton = await screen.findByRole("button", {
      name: "Async Button",
    });
    expect(asyncButton).toBeInTheDocument();
  });

  test("form renders", () => {
    render(<Sandbox />);
    expect(screen.getByRole("textbox", { name: /username/i })).toHaveValue("");
    expect(screen.getByLabelText(/password/i)).toHaveValue("");
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
