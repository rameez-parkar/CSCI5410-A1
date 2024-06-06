import Registration from "./components/Registration";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Signin from "./components/Signin";
import UpdateProfilePic from "./components/UpdateProfilePic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Signin />} />
        <Route path={"/register"} element={<Registration />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/uploadprofilepic"} element={<UpdateProfilePic />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
