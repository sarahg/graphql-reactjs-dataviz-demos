import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const CHART1_SUBSCRIPTION = gql`
  subscription {
    s1_top_customers_films_by_category {
      name
      count
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <Subscription subscription={CHART1_SUBSCRIPTION}>
          {({ data, error, loading }) => {
            if (error) {
              console.error(error);
              return "Error";
            }
            if (loading) {
              return "Loading";
            }
            let chartJSData = {
              labels: [],
              datasets: [
                {
                  label: "Number of rentals",
                  data: [],
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1
                },
              ],
            };
            data.s1_top_customers_films_by_category.forEach((item) => {
              chartJSData.labels.push(item.name);
              chartJSData.datasets[0].data.push(item.count);
            });
            return <HorizontalBar data={chartJSData} />;
          }}
        </Subscription>
      </div>
    );
  }
}

export default App;
