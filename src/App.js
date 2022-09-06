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
import RequireUser from "./hooks/RequireUser";
import { useState } from "react";

function App() {
  const [refetch, setRefetch] = useState(false);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <RequireUser>
              <Home refetch={refetch} setRefetch={setRefetch} />
            </RequireUser>
          }
        ></Route>
        <Route
          path="/completed"
          element={<Completed refetch={refetch} setRefetch={setRefetch} />}
        ></Route>
        <Route
          path="/to-do"
          element={<ToDo refetch={refetch} setRefetch={setRefetch} />}
        ></Route>
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
