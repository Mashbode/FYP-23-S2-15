// import React from 'react'
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/chart/featured/Featured";
import Chart from "../../components/chart/chart/Chart";
import List from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" />
          <Widget type="files" />
          <Widget type="share" />
          {/* <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart aspect={2 / 1} title={"Last 6 Months (Revenue)"} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Home;
