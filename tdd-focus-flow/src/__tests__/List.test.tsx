import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import List from "../components/List";
import { type Item } from "../utils";

vi.mock("../components/ItemCard", () => ({
  default: () => <article>item card</article>,
}));

describe("List", () => {
  const mockItems: Item[] = [
    {
      id: "1",
      title: "Test Item 1",
      description: "Content 1",
      category: "urgent",
    },
    {
      id: "2",
      title: "Test Item 2",
      description: "Content 2",
      category: "normal",
    },
  ];
  const mockOnDelete = vi.fn();

  test("renders the Flow Board heading", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Flow Board" })
    ).toBeInTheDocument();
  });

  test("renders correct number of ItemCards", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(2);
  });
  //
  test("renders empty grid when no items provided", () => {
    render(<List items={[]} onDelete={mockOnDelete} />);
    expect(screen.queryAllByRole("article")).toHaveLength(0);
  });
});
