import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
        </Routes>
        <ToastContainer limit={1} />
      </BrowserRouter>
    </div>
  );
}

export default App;
