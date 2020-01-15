import React,{Component} from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown.js";
import HighchartsReact from "highcharts-react-official";

//API
import axios from 'axios';


drilldown(Highcharts);


const data_test=[];
let page_init = 0;

function createData(revenue, revenue_growth, operational_expenses, ebitda_margin, ebitda, conolidated_income) {
    return { revenue, revenue_growth, operational_expenses, ebitda_margin, ebitda, conolidated_income };
}
function replaceKeys(object) {
    Object.keys(object).forEach(function (key) {
        var newKey = key.replace(/\s+/g, '');
        if (object[key] && typeof object[key] === 'object') {
            replaceKeys(object[key]);
        }
        if (key !== newKey) {
            object[newKey] = object[key];
            delete object[key];
        }
    });
}

export default class graph1 extends Component {
  constructor(props) {
    super(props);
    this.allowChartUpdate = true;
    this.state = {
        dados_empresa:[]
    };

    axios.get('https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL').then(resultado=>{
      this.setState({
        dados_empresa:resultado.data
      })
    })
  }
  componentDidMount() {
    const chart = this.refs.chartComponent.chart;
  }

  categoryClicked() {
    this.allowChartUpdate = false;
    this.setState({
      value: 2
    });
  }

  render() {
    let data=this.state.dados_empresa.financials;
    if(data!==undefined && page_init===0){
      replaceKeys(data)
      data.map(function(item,i){
        data_test.push(createData(data[i].Revenue,data[i].RevenueGrowth,data[i].OperatingExpenses,data[i].EBITDAMargin,data[i].EBITDA))
        // console.log(data[i])
      })
      page_init++;
      console.log(data_test[0].revenue);
    }
    return (
      <HighchartsReact
        allowChartUpdate={this.allowChartUpdate}
        ref={"chartComponent"}
        highcharts={Highcharts}
        options={{
          chart: {
            type: "line"
          },
          series: [
            {
              events: {
                click: e => {
                  this.categoryClicked(e);
                }
              },
                // name:'Receita',
                // data: [18274, 24916, 57177, 15112, 97031, 119931, 18111, 5948],
              data: [
                {
                  name: "Chrome",
                  y: 62.74,
                  drilldown: "Chrome"
                },
                {
                  name: "Firefox",
                  y: 10.57,
                  drilldown: "Firefox"
                }
              ]
            }
          ],
          drilldown: {
            series: [
              {
                name: "Chrome",
                id: "Chrome",
                data: [["v65.0", 0.1], ["v64.0", 1.3]]
              },
              {
                name: "Firefox",
                id: "Firefox",
                data: [["v58.0", 1.02], ["v57.0", 7.36]]
              }
            ]
          }
        }}
      />
    );
  }
}
