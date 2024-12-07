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



