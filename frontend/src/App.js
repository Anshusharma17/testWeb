import React from "react";
import Registration from "./pages/registration/Registration.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <Router history={createBrowserHistory}>
      <Routes>
        <Route path="/profile" element={user ? <Profile /> : <></>} />
        <Route
          path="/login"
          element={
            user != null ? <Navigate replace to="/profile" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            user != null ? <Navigate replace to="/profile" /> : <Registration />
          }
        />
        <Route
          path="/"
          element={true ? <Navigate replace to="/login" /> : <></>}
        />
      </Routes>
    </Router>
  );
}

export default App;
