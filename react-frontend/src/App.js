import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  render() {
    const data = {
      "labels": ["label1", "label2", "label3", "label4"],
      "datasets": [{
        "label": "Sample dataset",
        "data": [45, 23, 56, 55],
        "pointBackgroundColor": ["red", "brown", "green", "yellow"],
        "borderColor": "brown",
        "fill": false
      }],
    }
    return (
      <div
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px'}}
      >
        <Line
          data={data}
        />
      </div>
    );
  }
}

export default App;