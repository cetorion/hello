import { Route, Routes } from "react-router-dom";
import Home from "./home.jsx";
import List from "./list.jsx";
import View from "./view.jsx";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<List />} />
        <Route path="view/:id" element={<View />} />
      </Route>
    </Routes>
  );
};

export default Root;
