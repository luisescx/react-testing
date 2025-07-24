import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getFormElements } from "./Form.test";
import {
  createErrorHandler,
  deleteErrorHandler,
  getErrorHandler,
  posts,
  updateErrorHandler,
} from "../mocks/handlers";
import server from "../mocks/server";

describe("App", () => {
  test("renders the App component", () => {
    render(<App />);
    expect(screen.getByText(/posts manager/i)).toBeInTheDocument();
  });
  test("fetches posts on mount", async () => {
    render(<App />);
    expect(await screen.findByText(/first post/i)).toBeInTheDocument();
    expect(await screen.findByText(/second post/i)).toBeInTheDocument();
  });
  test("creates a new post", async () => {
    const user = userEvent.setup();
    render(<App />);
    const { input, button } = getFormElements();
    await user.type(input, "New Post");
    await user.click(button);
    expect(await screen.findByText(/new post/i)).toBeInTheDocument();
  });

  test("updates a post", async () => {
    const user = userEvent.setup();
    render(<App />);
    const likeBtn = await screen.findByRole("button", {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(likeBtn);
    expect(
      await screen.findByRole("button", { name: `👍 ${posts[0].likes}` })
    ).toBeInTheDocument();
  });

  test("deletes a post", async () => {
    const user = userEvent.setup();
    render(<App />);
    const initialPosts = await screen.findAllByRole("article");
    expect(initialPosts).toHaveLength(3);
    const lastPost = initialPosts[2];

    const deleteBtn = within(lastPost).getByRole("button", {
      name: /delete/i,
    });
    await user.click(deleteBtn);
    const postsAfterDelete = await screen.findAllByRole("article");
    expect(postsAfterDelete).toHaveLength(2);
  });

  test("shows error message when fetching posts fails", async () => {
    server.use(...getErrorHandler);
    render(<App />);
    expect(
      await screen.findByText(/failed to fetch posts/i)
    ).toBeInTheDocument();
  });

  test("shows error message when creating a post fails", async () => {
    const user = userEvent.setup();
    server.use(...createErrorHandler);
    render(<App />);
    const { input, button } = getFormElements();
    await user.type(input, "New Post");
    await user.click(button);

    expect(
      await screen.findByText(/failed to create post/i)
    ).toBeInTheDocument();
  });

  test("displays error message when updating post fails", async () => {
    const user = userEvent.setup();
    server.use(...updateErrorHandler);
    render(<App />);
    const likeBtn = await screen.findByRole("button", {
      name: `👍 ${posts[0].likes}`,
    });
    await user.click(likeBtn);
    expect(await screen.findByText(/failed to like post/i)).toBeInTheDocument();
  });

  test("displays error message when deleting post fails", async () => {
    const user = userEvent.setup();
    server.use(...deleteErrorHandler);
    render(<App />);

    const allPosts = await screen.findAllByRole("article");
    const firstPost = allPosts[0];
    const deleteBtn = within(firstPost).getByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteBtn);

    expect(
      await screen.findByText(/failed to delete post/i)
    ).toBeInTheDocument();
  });
});
