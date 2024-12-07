import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("user"); // Default role is "user"

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
        role, // Send role in the request
      });
      toast.success("Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred!";
    toast.error(errorMessage);
    setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="text" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          
          {/* Role Selection (Visible for admin use cases) */}
       

          <button disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background" />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
