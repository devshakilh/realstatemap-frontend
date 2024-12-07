import { createContext, useEffect, useState } from "react";
import { CloudUpload } from 'lucide-react';
 // Cloud upload icon

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setPublicId, setState }) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => {
          setLoaded(true);
        });
        script.addEventListener("error", () => {
          setError("Failed to load Cloudinary upload script.");
        });
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      setLoading(true); // Set loading when initiating the widget
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          setLoading(false); // Reset loading state after upload attempt
          if (error) {
            setError("Upload failed, please try again.");
            return;
          }
          if (result.event === "success") {
            console.log("Upload Success: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
          }
        }
      );

      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <div className="upload-widget-container">
        {loading && <div className="loading-indicator">Uploading...</div>}
        {error && <div className="error-message">{error}</div>}
        <button
          id="upload_widget"
          className={`cloudinary-button ${loading ? "loading" : ""}`}
          onClick={initializeCloudinaryWidget}
          disabled={loading} // Disable button while loading
          aria-label="Click to upload image"
          style={styles.uploadButton}
        >
           <CloudUpload  size={20} className="upload-icon" />
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </CloudinaryScriptContext.Provider>
  );
}


const styles = {
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009688', // Teal color
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
};

// Add hover effect and smooth transform transition
const hoverStyles = {
  ":hover": {
    backgroundColor: '#00796b', // Darker teal on hover
    transform: 'scale(1.05)', // Slight zoom effect
  },
};

export default UploadWidget;
export { CloudinaryScriptContext };
