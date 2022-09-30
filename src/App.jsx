import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";

import NavBar from "./components/NavBar";
import LayaoutRequireAuth from "./components/Layaout/LayaoutRequireAuth";
import LayoutContainerForm from "./components/Layaout/LayoutContainerForm";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LayaoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
