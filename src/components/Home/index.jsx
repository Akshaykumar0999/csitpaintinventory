import React, { useContext } from "react";
import Header from "../Header";
import "./index.css";
import { NavMenuContext } from "../../Context/navMenuContext";
import Navbar from "../Navbar";

const Home = () => {
  const data = useContext(NavMenuContext);
  return (
    <div
      className="main-container-card"
      style={{
        background: data.theme && "#212631",
        color: data.theme && "#fff",
      }}
    >
      {data.openNav && <Navbar />}
      <div className="purchase-main-card">
        <Header />
        <main>Home</main>
      </div>
    </div>
  );
};

export default Home;
