import { Link } from "react-router-dom";

function NotFound () {
  return (
    <main className="container">
      <p>Page not found!</p>
      <p>
        <Link to="/">Return Home</Link>
      </p>
    </main>
  );
}

export default NotFound;