import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const CHART2_SUBSCRIPTION = gql`
  subscription {
    s2_staff_most_sales {
      name
      total_amt
    }
  }
`;

class Chart2 extends Component {
  render() {
    return (
      <div>
        <Subscription subscription={CHART2_SUBSCRIPTION}>
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
                    scaleLabel: {
                      display: true,
                      labelString: "Sales in dollars"
                    },
                    ticks: {
                      callback: function (value, index, values) {
                        return "$" + value.toLocaleString();
                      },
                    }
                  }
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Employee name"
                    }
                  },
                ],
              },
            };

            let chartJSData = {
              labels: [],
              datasets: [
                {
                  label: "Total sales",
                  data: [],
                  backgroundColor: '#FF6384'
                },
              ],
            };
            data.s2_staff_most_sales.forEach((item) => {
              chartJSData.labels.push(item.name);
              chartJSData.datasets[0].data.push(item.total_amt);
            });
            return <Bar data={chartJSData} options={options} />;
          }}
        </Subscription>
      </div>
    );
  }
}

export default Chart2;
