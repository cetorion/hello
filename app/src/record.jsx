import { useState, useEffect } from "react";
import "./record.css";
import { useStore } from "./store.jsx";
import { useNavigate } from "react-router-dom";
import View from "./view.jsx";

const Record = ({ url }) => {
  let [data, setData] = useState({ name: getName(url), status: 0 });
  let [reload] = useStore("reload");
  let navigate = useNavigate();
  let handleClick = () => navigate(`/view/${data.name}`);

  useEffect(() => {
    setData({ ...data, status: 0 });
    fetch(url, { method: "GET", mode: "cors" })
      .then((res) => {
        setData({ ...data, status: res.status });
      })
      .catch((err) => console.error(err));
  }, [reload]);

  return (
    <div className="record" onClick={handleClick}>
      <h2>{capName(data.name)}</h2>
      <span className={`dot ${data.status == 200 ? "ok" : ""}`}></span>
    </div>
  );
};

const getName = (url) => {
  let host = new URL(url).host.split(".");
  return host.length == 3 ? host[1] : host[0];
};

const capName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

export default Record;
