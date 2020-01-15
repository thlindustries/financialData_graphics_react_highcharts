
// //API ---->   https://financialmodelingprep.com/api/v3/financials/income-statement/{{SIMBOLO DA EMPRESA}}
//-----------------------------------------------------------------------------------------------------
import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Grid from '@material-ui/core/Grid';

//Comunicação com a API
import axios from 'axios';

//variaveis para manipular o grafico
const data_API=[];
let page_init = 0;
let lista_receita=[]
let lista_cresciment_receita=[]
let lista_despesas_operacionais=[]
let lista_margem_ebitda=[]
let lista_ebitda=[]
let lista_renda_consolidada=[]
let simbolo_empresa

//função para criar o array object (data_API) com as informações da API
function createData(revenue, revenue_growth, operational_expenses, ebitda_margin, ebitda, consolidated_income) {
  return { revenue, revenue_growth, operational_expenses, ebitda_margin, ebitda, consolidated_income };
}

//função para obter o simbolo da empresa da URL
function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  simbolo_empresa=arrayOfStrings[4]
  // console.log(arrayOfStrings)

  // console.log('A string original é: "' + stringToSplit + '"');
  // console.log('O separador é: "' + separator + '"');
  // console.log('O array tem ' + arrayOfStrings.length + ' elementos: ' + arrayOfStrings.join(' / '));
}

//função que remove os espaços das Keys do JSON retornado pela API
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
    let link = window.location.href
    splitString(link,'/')
    console.log(simbolo_empresa)
    
    super(props);
    this.state={
      dados_empresa:[]
    }
    axios.get('https://financialmodelingprep.com/api/v3/financials/income-statement/'+simbolo_empresa).then(resultado=>{
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
        data_API.push(createData(data[i].Revenue,data[i].RevenueGrowth,data[i].OperatingExpenses,data[i].EBITDAMargin,data[i].EBITDA,data[i].ConsolidatedIncome))
      })
      page_init++;

      data_API.map(function(item,i){
        lista_receita.push(parseFloat(data_API[i].revenue))
        lista_cresciment_receita.push(parseFloat(data_API[i].revenue_growth))
        lista_despesas_operacionais.push(parseFloat(data_API[i].operational_expenses))
        lista_margem_ebitda.push(parseFloat(data_API[i].ebitda_margin))
        lista_ebitda.push(parseFloat(data_API[i].ebitda))
        lista_renda_consolidada.push(parseFloat(data_API[i].consolidated_income))
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
