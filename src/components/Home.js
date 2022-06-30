import React, { useState } from "react";
import ToDo from "./ToDo";
import Completed from "./Completed";

const Home = () => {
  const [refetch, setRefetch] = useState(false);
  return (
    <div>
      <ToDo refetch={refetch} setRefetch={setRefetch}></ToDo>
      <Completed refetch={refetch} setRefetch={setRefetch}></Completed>
    </div>
  );
};

export default Home;
