import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";

import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Books } from "./components/Books";
import Cart from "./components/Cart";
import Bookdetail from "./components/Bookdetail";
import { Addbook } from "./components/Addbook";
import { Protected } from "./components/Protected";
import { Editbook } from "./components/Editbook";
import { Filterbooks } from "./components/Filterbooks";
import { Payment } from "./components/Payment";
import { Paymentsuccess } from "./components/Paymentsuccess";
import { Paymentfailure } from "./components/Paymentfailure";
import { Search } from "./components/Search";
import { Users } from "./components/Users";
import { Profile } from "./components/Profile";
import { Changepassword } from "./components/Changepassword";
import { Aboutme } from "./components/Aboutme";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<Books />} />
            <Route path="/cart" element={<Protected Component={Cart} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/aboutme" element={<Aboutme />} />
            <Route path="/book/:id" element={<Bookdetail />} />
            <Route path="/books/addbook" element={<Addbook />} />
            <Route path="/editbook/:id" element={<Editbook />} />
            <Route path="/books/:value" element={<Filterbooks />} />
            <Route path="/processPayment/:id" element={<Payment />} />
            <Route path="/paymentSuccess/:id" element={<Paymentsuccess />} />
            <Route path="/paymentFailure/:id" element={<Paymentfailure />} />
            <Route path="/search" element={<Search />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/profile"
              element={<Protected Component={Profile} />}
            />
            <Route path="/changepassword" element={<Changepassword />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
