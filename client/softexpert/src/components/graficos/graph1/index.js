
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
let lista_receita=[]
let lista_cresciment_receita=[]
let lista_despesas_operacionais=[]
let lista_margem_ebitda=[]
let lista_ebitda=[]
let lista_renda_consolidada=[]

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
        dados_empresa:resultado.data,
        series: [
          {
            name:'Receita',
            data:lista_receita
          },
          {
            name:'Crescimento da receita',
            data: lista_cresciment_receita
          },
          {
            name:'Despesas operacionais',
            data: lista_despesas_operacionais
          },
          {
            name:'Margem EBITDA',
            data: lista_margem_ebitda
          },
          {
            name:'EBITDA',
            data: lista_ebitda
          },
          {
            name:'Renda Consolidada',
            data: lista_renda_consolidada
          },
        ]
      })
    })
  }
  render() {
    let data=this.state.dados_empresa.financials;
    if(data!==undefined && page_init===0){
      replaceKeys(data)
      data.map(function(item,i){
        data_test.push(createData(data[i].Revenue,data[i].RevenueGrowth,data[i].OperatingExpenses,data[i].EBITDAMargin,data[i].EBITDA,data[i].ConsolidatedIncome))
      })
      page_init++;

      
      data_test.map(function(item,i){
        lista_receita.push(parseFloat(data_test[i].revenue))
        lista_cresciment_receita.push(parseFloat(data_test[i].revenue_growth))
        lista_despesas_operacionais.push(parseFloat(data_test[i].operational_expenses))
        lista_margem_ebitda.push(parseFloat(data_test[i].ebitda_margin))
        lista_ebitda.push(parseFloat(data_test[i].ebitda))
        lista_renda_consolidada.push(parseFloat(data_test[i].consolidated_income))
      })
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            <HighchartsReact 
              highcharts={Highcharts}
              options={{
                title: {
                  text: 'Informações sobre a empresa',
                },
                series:this.state.series,
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
                }
              }}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}
