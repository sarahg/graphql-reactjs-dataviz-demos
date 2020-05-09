import React from "react";
import Chart1 from "./components/chart1";
import Chart2 from "./components/chart2";
import Chart3 from "./components/chart3";
import Chart4 from "./components/chart4";

// @todo start the Y-axis at 0 on bar charts

export default class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Investigate a Relational Database</h1>
          <h2>Data Visualizations</h2>
        </header>

        <hr />
        <h3>Chart 1</h3>
        <Chart1 />

        <hr />
        <h3>Chart 2</h3>
        <Chart2 />

        <hr />
        <h3>Chart 3</h3>
        <Chart3 />

        <hr />
        <h3>Chart 4</h3>
        <Chart4 />

      </div>
    );
  }
}
