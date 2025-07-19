import { useEffect, useState } from "react";

const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Show async button after 500ms
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>

      <h1>Main Heading</h1>
      <h2>Subheading</h2>

      <img src="example.jpg" alt="Example" />

      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>

      <article>card</article>
      <article>card</article>
      <article>card</article>

      <button>Click me</button>
      <button>Cancel</button>

      {showError && <button>Error</button>}

      {/* Async button to demonstrate findByRole */}
      {showAsyncButton && <button>Async Button</button>}
      {/* form */}
      {/* <form>
        <input type='text' />
        <input type='email' />
        <button type='submit'>Submit</button>
      </form> */}
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sandbox;
