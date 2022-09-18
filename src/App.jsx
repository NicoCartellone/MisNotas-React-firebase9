import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Perfil from "./routes/Perfil";

import NavBar from "./components/NavBar";
import LayaoutRequireAuth from "./components/Layaout/LayaoutRequireAuth";
import LayoutContainerForm from "./components/Layaout/LayoutContainerForm";
import NotFound from "./routes/NotFound";

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
