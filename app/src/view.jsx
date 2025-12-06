import { useParams } from "react-router-dom";

const View = () => {
  let { id } = useParams();
  return <h1>{id}</h1>;
};

export default View;
