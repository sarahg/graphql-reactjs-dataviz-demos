import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const CHART3_SUBSCRIPTION = gql`
  subscription {
    s3_fc_replacement_cost {
      count
      name
    }
  }
`;

class Chart3 extends Component {
  render() {
    return (
      <div>
        <Subscription subscription={CHART3_SUBSCRIPTION}>
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
                xAxes: [
                  {
                    ticks: {
                      callback: function (value, index, values) {
                        return "$" + value;
                      },
                      beginAtZero: true,
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Cost in dollars"
                    },
                  },
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Film category"
                    },
                  }
                ]
              },
            };

            let chartJSData = {
              labels: [],
              datasets: [
                {
                  label: "Replacement cost",
                  data: [],
                  backgroundColor: "#f9d904",
                },
              ],
            };
            data.s3_fc_replacement_cost.forEach((item) => {
              chartJSData.labels.push(item.name);
              chartJSData.datasets[0].data.push(item.count);
            });
            return <HorizontalBar data={chartJSData} options={options} />;
          }}
        </Subscription>
      </div>
    );
  }
}

export default Chart3;
