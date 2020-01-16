
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
let lista_cresciment_receita=[]

//função para criar o array object (data_API) com as informações da API
function createData(RevenueGrowth) {
  return { RevenueGrowth};
}

//função para obter o simbolo da empresa da URL
function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  //simbolo_empresa=arrayOfStrings[4]
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

export default class GraphCrescReceita extends Component {
  constructor(props) {

    //logica para pegar o simbolo da empresa que veio da tabela de empresas na página principal
    let link = window.location.href
    // splitString(link,'/')
    // console.log(simbolo_empresa)
    
    super(props);
    this.state={
      dados_empresa:[]
    }
    //Chamando a API via Axios
    axios.get('https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL').then(resultado=>{
      this.setState({
        dados_empresa:resultado.data,

        //Criando uma variável Series e salvando no state da página 
        series: [
          {
            name:'Crescimento da Receita AAPL',
            data:lista_cresciment_receita
            // data:[51,42,32,25,11]
          },
        ]
      })
    })
  }

  render() {
    let data=this.state.dados_empresa.financials;

    //Condição para evitar que a página carregue as informações mais de uma vez e duplique os dados no array data_API
    if(data!==undefined && page_init===0){
      
      replaceKeys(data)
      data.map(function(item,i){
        data_API.push(createData(data[i].RevenueGrowth,))
      })
      page_init++;

      data_API.map(function(item,i){
        lista_cresciment_receita.push(parseFloat(data_API[i].RevenueGrowth))
      })
      // console.log(lista_cresciment_receita)
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            <HighchartsReact 
              highcharts={Highcharts}
              options={{
                title: {
                  text: 'Crescimento da receita da empresa AAPL',
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
