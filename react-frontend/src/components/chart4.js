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

            let options = {
              legend: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Rentals",
                    },
                  },
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Film rating",
                    },
                  },
                ],
              },
            };

            let chartJSData = {
              labels: [],
              datasets: [
                {
                  label: "Number of rentals",
                  data: [],
                  backgroundColor: "#FF6384",
                },
              ],
            };
            data.s4_ratings_long_rentals.forEach((item) => {
              chartJSData.labels.push(item.rating);
              chartJSData.datasets[0].data.push(item.rental_count);
            });
            return <Bar data={chartJSData} options={options} />;
          }}
        </Subscription>
      </div>
    );
  }
}

export default Chart4;
