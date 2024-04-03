import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import Books from "../src/Pages/Books";
import Request from "./Pages/Request";
import System from "./Pages/System";
import Registerbook from "./Pages/Register-book";
import RegisterUser from "./Pages/Register-user";
import RegisterEquipment from "./Pages/Register-equipment";
import Equipment from "./Pages/Equipment";
import RegisterSchedule from "./Pages/Register-schedule";
import Schedule from "./Pages/Schedule";
import Support from "./Pages/Support";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route path="/request" element={<Request />}></Route>
          <Route path="/system" element={<System />}></Route>
          <Route path="/equipment" element={<Equipment />}></Route>
          <Route path="/register-book" element={<Registerbook />}></Route>
          <Route path="/register-user" element={<RegisterUser />}></Route>
          <Route path="/schedule" element={<Schedule />}></Route>
          <Route
            path="/register-schedule"
            element={<RegisterSchedule />}
          ></Route>
          <Route
            path="/register-equipment"
            element={<RegisterEquipment />}
          ></Route>
          <Route path="/support" element={<Support />}></Route>
          {/*<Route path="/support" element={<Chat />}></Route>*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
