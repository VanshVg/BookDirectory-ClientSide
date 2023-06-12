import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/Navbar";

import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Aboutus } from "./components/Aboutus";
import { Books } from "./components/Books";
import Cart from "./components/Cart";
import Bookdetail from "./components/Bookdetail";
import { Addbook } from "./components/Addbook";
import { Protected } from "./components/Protected";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<Books />} />
            <Route path="/cart" element={<Protected Component={Cart} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/book/:id" element={<Bookdetail />} />
            <Route path="/books/addbook" element={<Addbook />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
