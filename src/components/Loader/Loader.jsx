import  { useState, useEffect } from "react";
import "./Loader.css"; // Make sure to import the CSS

const LoadingSpinner = () => {


  return (
    <div className="spinner"></div>
  );
};

const Loader = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading for 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Set the loading state to false after 3 seconds
  }, []);

  return (
    <div className="example-container">
      {loading ? <LoadingSpinner /> : <div>Content Loaded!</div>}
    </div>
  );
};

export default Loader;



<div className="card skeleton">
        <div className="imageContainer skeleton-image"></div>
        <div className="textContainer">
          <div className="skeleton-title"></div>
          <div className="skeleton-location"></div>
          <div className="skeleton-detail"></div>
          <div className="skeleton-price"></div>
          <div className="bottom">
            <div className="features">
              <div className="feature skeleton-detail"></div>
              <div className="feature skeleton-detail"></div>
            </div>
            <div className="icons">
              <div className="icon skeleton-image"></div>
              <div className="icon skeleton-image"></div>
            </div>
          </div>
        </div>
      </div>