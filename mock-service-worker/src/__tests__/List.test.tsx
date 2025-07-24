import { render, screen } from "@testing-library/react";
import { Post } from "../hooks/usePosts";
import List from "../components/List";

const mockPost: Post[] = [
  {
    id: "1",
    likes: 1,
    title: "First post",
  },
  {
    id: "2",
    likes: 3,
    title: "Second post",
  },
];

const mockOnDelete = vi.fn();
const mockOnLike = vi.fn();

describe("List component", () => {
  test("renders correct number of articles", () => {
    render(
      <List posts={mockPost} onLike={mockOnLike} onDelete={mockOnDelete} />
    );

    const articlesList = screen.getAllByRole("article");
    expect(articlesList).toHaveLength(2);
  });

  test("renders empty list when no posts provided", () => {
    render(<List posts={[]} onLike={mockOnLike} onDelete={mockOnDelete} />);

    const articlesList = screen.queryAllByRole("article");
    expect(articlesList).toHaveLength(0);
  });
});
