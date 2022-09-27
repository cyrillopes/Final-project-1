import React from "react";
import QuickSearch from "./QuickSearch";
import DisplayCard from "./DisplayCard";
import "../css/index.css";
import Header from "../Header/Header";
const Home = () => {
  return (
    <>
      <Header />
      <DisplayCard />
      <QuickSearch />
    </>
  );
};

export default Home;
