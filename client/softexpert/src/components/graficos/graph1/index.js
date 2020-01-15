
// //API ---->   https://financialmodelingprep.com/api/v3/financials/income-statement/{{SIMBOLO DA EMPRESA}}
//-----------------------------------------------------------------------------------------------------

import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Grid from '@material-ui/core/Grid';

//API
import axios from 'axios';

// import { Container } from './styles';
const data_test=[];
let page_init = 0;

const options = {
  title: {
    text: 'Grafico teste',
  },
  // data: [data_test[0].revenue,data_test[1].revenue,data_test[2].revenue,data_test[3].revenue,data_test[4].revenue,data_test[5].revenue,data_test[6].revenue,data_test[7].revenue,data_test[8].revenue,data_test[9].revenue,data_test[10].revenue,data_test[11].revenue]
  series: [{
    name:'Receita',
    data: [18274, 24916, 57177, 15112, 97031, 119931, 18111, 5948]
    },{
      name:'Crescimento da receita',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
    name:'Despesas operacionais',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name:'Margem EBITDA',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name:'EBITDA',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name:'Renda Consolidada',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }
  ],
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            }
        }
    }]
  },
  yAxis: {
    title: {
        text: 'Valores'
    }
  },
  xAxis: {
    accessibility: {
        rangeDescription: [2010,2011,2012]
    }
  },
}

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

    this.state={
      dados_empresa:[]
    }

    axios.get('https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL').then(resultado=>{
      this.setState({
        dados_empresa:resultado.data
      })
    })
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            <HighchartsReact 
              highcharts={Highcharts}
              options={options}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}
