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
            let chartJSData = {
              labels: [],
              datasets: [
                {
                  label: "Highest film replacement cost",
                  data: [],
                  backgroundColor: "rgba(255,99,132,0.2)",
                  borderColor: "rgba(255,99,132,1)",
                  borderWidth: 1,
                },
              ],
            };
            data.s3_fc_replacement_cost.forEach((item) => {
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

export default Chart3;
