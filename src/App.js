import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";

import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Aboutus } from "./components/Aboutus";
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
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/book/:id" element={<Bookdetail />} />
            <Route path="/books/addbook" element={<Addbook />} />
            <Route path="/editbook/:id" element={<Editbook />} />
            <Route path="/books/:value" element={<Filterbooks />} />
            <Route path="/processPayment/:id" element={<Payment />} />
            <Route path="/paymentSuccess/:id" element={<Paymentsuccess />} />
            <Route path="/paymentFailure/:id" element={<Paymentfailure />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
