import "./home.css";
import { useStore } from "./store.jsx";
import refreshIcon from "/refresh.svg";
import { Outlet } from "react-router-dom";

const Home = () => {
  let [reload, setReload] = useStore("reload");

  return (
    <div id="home">
      <header>
        <h1>Hello</h1>
        <img
          onClick={() => setReload(!reload)}
          src={refreshIcon}
          className="icon"
          alt="Refresh Icon"
        />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
