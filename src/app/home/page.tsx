"use client";

import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";

const Home = () => {
  const { name } = useContext(UserContext)!;
  return (
    <div>
      <div>home</div>
      <div>name: {name}</div>
    </div>
  );
};

export default Home;
