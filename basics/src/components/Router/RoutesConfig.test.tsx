import { createMemoryRouter, RouterProvider } from "react-router";
import { routesConfig } from "./RoutesConfig";
import { render, screen } from "@testing-library/react";
import { AppWithRoutes } from "./AppWithRoutes";
import userEvent from "@testing-library/user-event";

vi.mock("./Routes/Home", () => ({
  Home: () => <div data-testid="HomeMock" />,
}));

vi.mock("./Routes/About", () => ({
  About: () => <div data-testid="AboutMock" />,
}));

vi.mock("./Routes/PageNotFound", () => ({
  PageNotFound: () => <div data-testid="PageNotFoundMock" />,
}));

vi.mock("./Routes/Post", () => ({
  Post: () => <div data-testid="PostMock" />,
}));

vi.mock("./Routes/Posts", () => ({
  Posts: () => <div data-testid="PostsMock" />,
}));

function setRouter(route: string) {
  const router = createMemoryRouter(routesConfig, {
    initialEntries: [route],
  });

  return router;
}

describe("Routes config tests", () => {
  it("Should load the home component first", () => {
    render(<RouterProvider router={setRouter("/")} />);
    const home = screen.getByTestId("HomeMock");
    expect(home).toBeInTheDocument();
  });

  it("Should load the about component on about route", () => {
    render(<RouterProvider router={setRouter("/about")} />);

    const about = screen.getByTestId("AboutMock");
    expect(about).toBeInTheDocument();
  });

  it("Should load the not found component on invalid route", () => {
    render(<RouterProvider router={setRouter("/notSupported")} />);

    const pageNotFound = screen.getByTestId("PageNotFoundMock");
    expect(pageNotFound).toBeInTheDocument();
  });

  it("Should load the Post component on post route", () => {
    render(<RouterProvider router={setRouter("/post/2")} />);

    const post = screen.getByTestId("PostMock");
    expect(post).toBeInTheDocument();
  });

  describe("Navbar navigation tests", () => {
    it("show home component on home click", async () => {
      render(<AppWithRoutes />);
      const user = userEvent.setup();
      const homeButton = screen.getByText("Home");

      await user.click(homeButton);

      const home = screen.getByTestId("HomeMock");
      expect(home).toBeInTheDocument();
    });

    it("show About component on about click", async () => {
      render(<AppWithRoutes />);
      const user = userEvent.setup();
      const aboutButton = screen.getByText("About");

      await user.click(aboutButton);

      const about = screen.getByTestId("AboutMock");
      expect(about).toBeInTheDocument();
    });

    it("show Posts component on posts click", async () => {
      render(<AppWithRoutes />);
      const user = userEvent.setup();
      const postsButton = screen.getByText("Posts");

      await user.click(postsButton);

      const posts = screen.getByTestId("PostsMock");
      expect(posts).toBeInTheDocument();
    });
  });
});
