import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../config/firebase";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";

export function Auth() {
  const [formData, setFormData] = useState({email: "", password: ""});
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const signIn = async () => {
    const {email, password} = formData;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSignedIn(true);
      setError("");
    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Invalid email or password.");
      setSignedIn(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSignedIn(false);
      setError("");
    } catch (err) {
      console.error("Logout failed:", err.message);
      setError("An error occurred during logout.");
    }
  };

  return (
    <div className="body">
      {!signedIn ? (
        <>
          <input
            name="email"
            type="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleChange}
            className="input"
            autoFocus
          />
          <input
            name="password"
            type="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
            className="input"
          />
          <button
            className="btn-23"
            onClick={signIn}
            disabled={!formData.email || !formData.password}
          >
            Sign In
          </button>
          {error && <p style={{color: "red", marginTop: "0.5rem"}}>{error}</p>}
        </>
      ) : (
        <>
          <p>Welcome, Admin</p>
          <button className="btn-23" onClick={logout}>
            Logout
          </button>
          <button className="btn-23" onClick={() => navigate("/Admin")}>
            Administrator's Page
          </button>
        </>
      )}
      <button className="btn-23" onClick={() => navigate("/")}>
        Home Page
      </button>
    </div>
  );
}
