import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
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
            let chartJSData = {
              labels: [],
              datasets: [
                {
                  label: "Total sales by staff",
                  data: [],
                  backgroundColor: ['#FF6384', '#36A2EB'],
                  borderWidth: 1,
                },
              ],
            };
            data.s2_staff_most_sales.forEach((item) => {
              chartJSData.labels.push(item.name);
              chartJSData.datasets[0].data.push(item.total_amt);
            });
            return <Doughnut data={chartJSData} />;
          }}
        </Subscription>
      </div>
    );
  }
}

export default Chart2;
