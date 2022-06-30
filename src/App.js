import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Completed from "./components/Completed";
import ToDo from "./components/ToDo";
import Days from "./components/Calendar";
import Login from "./components/Login";
import Register from "./components/Register";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/completed" element={<Completed />}></Route>
        <Route path="/to-do" element={<ToDo />}></Route>
        <Route path="/calendar" element={<Days />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
