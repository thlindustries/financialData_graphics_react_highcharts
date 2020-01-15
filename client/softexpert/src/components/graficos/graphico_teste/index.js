import React from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// require("./data.src.js")(Highcharts);
// require("./boost.src.js")(Highcharts);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [["Time"]]
    };
  }

  componentDidMount() {
    window.setInterval(this.updateState, 500);
  }

  updateState = () => {
    this.setState({
      data: [
        ["Time", "2018-11-28", "2018-11-29", "2018-11-30"],
        ["s1", Math.random(), Math.random(), Math.random()],
        ["s2", Math.random(), Math.random(), Math.random()]
      ]
    });
  };

  render() {
    return (
      <div>
        <HighchartsReact
          constructorType={"chart"}
          highcharts={Highcharts}
          options={{
            boost: {
              seriesThreshold: 1
            },
            chart: {
              animation: false,
              height: 400,
              type: "line",
              width: 800,
              zoomType: "x"
            },
            credits: {
              enabled: false
            },
            data: {
              columns: this.state.data
            },
            legend: {
              enabled: false
            },
            series: [
              {
                boostThreshold: 1,
                colorIndex: 1,
                lineWidth: 1,
                type: "line",
                zIndex: 2
              },
              {
                boostThreshold: 1,
                colorIndex: 0,
                lineWidth: 1,
                type: "line",
                zIndex: 1
              }
            ],
            title: {
              text: "Demo"
            },
            tooltip: {
              shared: true,
              xDateFormat: "%Y-%m-%d"
            },
            xAxis: {
              crosshair: true,
              labels: {
                enabled: false
              },
              tickColor: "#00000",
              tickLength: 20,
              title: {
                text: undefined
              },
              type: "datetime"
            },
            yAxis: {
              title: {
                text: undefined
              }
            }
          }}
        />
      </div>
    );
  }
}

// render(<App />, document.getElementById("root"));