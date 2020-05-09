import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const CHART4_SUBSCRIPTION = gql`
  subscription {
    s4_ratings_long_rentals {
      rating
      rental_count
    }
  }
`;

class Chart4 extends Component {
  render() {
    return (
      <div>
        <Subscription subscription={CHART4_SUBSCRIPTION}>
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
                  label: "Rentals longer than 7 days",
                  data: [],
                  backgroundColor: "rgba(255,99,132,0.2)",
                  borderColor: "rgba(255,99,132,1)",
                  borderWidth: 1,
                },
              ],
            };
            data.s4_ratings_long_rentals.forEach((item) => {
              chartJSData.labels.push(item.rating);
              chartJSData.datasets[0].data.push(item.rental_count);
            });
            return <Bar data={chartJSData} />;
          }}
        </Subscription>
      </div>
    );
  }
}

export default Chart4;
