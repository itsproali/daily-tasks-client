import React from "react";
import ToDo from "./ToDo";
import Completed from "./Completed";

const Home = ({ refetch, setRefetch }) => {
  return (
    <div>
      <ToDo refetch={refetch} setRefetch={setRefetch}></ToDo>
      <Completed refetch={refetch} setRefetch={setRefetch}></Completed>
    </div>
  );
};

export default Home;
