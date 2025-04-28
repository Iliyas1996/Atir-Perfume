import {Auth} from "./components/auth.js";
import {Admin_Page} from "./components/Admin_Page.js";
import "./App.css";
import {Main_Page} from "./components/Main_Page.js";
import {BrowserRouter as Router, Route, Routes} from "react-router";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main_Page />} />
          <Route path="auth" element={<Auth />} />
          <Route path="Admin" element={<Admin_Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
