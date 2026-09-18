import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUserData } from "../services/userService";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import auth from "../firebase/auth";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

     const result =
  await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

await updateProfile(result.user, {
  displayName: name
});

await createUserData(
  result.user.uid,
  {
    name,
    email,
    role: "user",
    photoURL: ""
  }
);

navigate("/");
    } catch (error) {
      console.error(error);

      setError(getFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <div className="logo-icon">
            IQ
          </div>

          <div>
            <h2>InterviewIQ</h2>
            <span>Interview Preparation</span>
          </div>
        </div>

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Start preparing for your next interview.
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

function getFirebaseError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account already exists with this email.";

    case "auth/invalid-email":
      return "Please enter a valid email.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    default:
      return "Something went wrong. Please try again.";
  }
}

export default Signup;