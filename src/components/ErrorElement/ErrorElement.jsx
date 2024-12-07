import { Link } from "react-router-dom";
import "./ErrorElement.css"; // Import custom CSS

export default function ErrorElement() {
  return (
    <div className="error-container">
      <div className="error-card">
        <img
          src="https://www.shutterstock.com/shutterstock/videos/1069724776/thumb/1.jpg?ip=x480"
          alt="404"
          className="error-image"
        />
        <h1 className="error-title">404</h1>
        <p className="error-message">
          Oops! The page {`you're looking for doesn't exist`}.
        </p>
        <p className="error-description">It might have been moved or deleted.</p>
        <div className="error-button">
          <Link
            to="/"
            className="home-button"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
