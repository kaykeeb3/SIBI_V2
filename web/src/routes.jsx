import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import Books from "../src/Pages/Books";
import Request from "./Pages/Request";
import System from "./Pages/System";
import Multimeans from "./Pages/Multimeans";
import Monitors from "./Pages/Monitors";
import Registerbook from "./Pages/Register-book";
import RegisterUser from "./Pages/Register-user";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/request" element={<Request />}></Route>
          <Route path="/system" element={<System />}></Route>
          <Route path="/multimeans" element={<Multimeans />}></Route>
          <Route path="/monitors" element={<Monitors />}></Route>
          <Route path="/register-book" element={<Registerbook />}></Route>
          <Route path="/register-user" element={<RegisterUser />}></Route>
          <Route path="/" element={<Monitors />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
