
// //API ---->   https://financialmodelingprep.com/api/v3/financials/income-statement/{{SIMBOLO DA EMPRESA}}
//-----------------------------------------------------------------------------------------------------

import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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
  series: [{
    name:'Receita',
    data: []
    },{
      name:'Crescimento da receita',
      data: []
    }, {
    name:'Despesas operacionais',
      data: []
    }, {
      name:'Margem EBITDA',
        data: []
    }, {
      name:'EBITDA',
        data: []
    }, {
      name:'Renda Consolidada',
        data: []
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

function createData(revenue, revenue_growth, operational_expenses, ebitda_margin, ebitda, consolidated_income) {
  return { revenue, revenue_growth, operational_expenses, ebitda_margin, ebitda, consolidated_income };
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
        data_test.push(createData(data[i].Revenue,data[i].RevenueGrowth,data[i].OperatingExpenses,data[i].EBITDAMargin,data[i].EBITDA,data[i].ConsolidatedIncome))
        // console.log(data[i])
      })
      page_init++;
      //options.series[0].data=68274;
      
      // options.series.map(function(item,i){
      //   console.log(options.series[i].data)
      // })
      data_test.map(function(item,i){
        // console.log(data_test[i].revenue)
        options.series[0].data.push(parseFloat(data_test[i].revenue))
        options.series[1].data.push(parseFloat(data_test[i].revenue_growth))
        options.series[2].data.push(parseFloat(data_test[i].operational_expenses))
        options.series[3].data.push(parseFloat(data_test[i].ebitda_margin))
        options.series[4].data.push(parseFloat(data_test[i].ebitda))
        options.series[5].data.push(parseFloat(data_test[i].consolidated_income))
        // console.log(data_test[i].ebtida)
      })
      // for(let k=0;k<6;k++){
      //   console.log(options.series[k].data)
      // }
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
