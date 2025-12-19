import { useEffect, useState } from "react";
import Record from "./record.jsx";
import refreshIcon from "/refresh.svg";

const Home = () => {
  let [urls, setUrls] = useState([]);

  useEffect(() => {
    getUrls().then((arr) => setUrls(arr));
  }, []);

  return (
    <>
      {urls.length === 0
        ? null
        : urls.map((url, inx) => <Record key={inx} url={url} />)}
    </>
  );
};

const getUrls = () => {
  return fetch("urls.json", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((jsn) => jsn.urls);
};

export default Home;
