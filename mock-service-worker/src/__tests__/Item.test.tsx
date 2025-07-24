import { render, screen } from "@testing-library/react";
import { Post } from "../hooks/usePosts";
import userEvent, { UserEvent } from "@testing-library/user-event";
import Item from "../components/Item";

const mockPost: Post = {
  id: "1",
  likes: 1,
  title: "First post",
};

describe("Item", () => {
  const mockOnDelete = vi.fn();
  const mockOnLike = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();

    mockOnDelete.mockClear();
    mockOnLike.mockClear();

    render(
      <Item onDelete={mockOnDelete} onLike={mockOnLike} post={mockPost} />
    );
  });

  test("renders post title correctly", () => {
    const titleText = screen.getByText(mockPost.title);
    expect(titleText).toBeInTheDocument();
  });

  test("displays correct number of likes", () => {
    const titleText = screen.getByText(`👍 ${mockPost.likes}`);
    expect(titleText).toBeInTheDocument();
  });

  test("calls onLike when like button is clicked", async () => {
    const likesButton = screen.getByRole("button", {
      name: `👍 ${mockPost.likes}`,
    });

    await user.click(likesButton);
    expect(mockOnLike).toHaveBeenCalledTimes(1);
    expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
  });

  test("calls onDelete when delete button is clicked", async () => {
    const deleteButton = screen.getByRole("button", {
      name: /delete/i,
    });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockPost.id);
  });
});
