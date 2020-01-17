
import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Grid from '@material-ui/core/Grid';

//Comunicação com a API
import axios from 'axios';

//variaveis para manipular o grafico
let page_init = 0;

let listas_receita=[];
let simbolo;
let todos_simbolos;

let lista_de_datas=[];
let maior_lista_anos=0;
let data_API=[];

//função para criar o array object (data_API) com as informações da API
function createData(revenue) {
  return { revenue};
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

export default class GraphReceita extends Component {
  constructor(props) {

    //Simbolos das empresas que sao passados via props do componente
    simbolo=props.simbolo[0]
    todos_simbolos=props.simbolo
    
    super(props);
    this.state={
      dados_empresa:[]
    }
    //Chamando a API via Axios
    todos_simbolos.map(function(item,i){
        axios.get('https://financialmodelingprep.com/api/v3/financials/income-statement/'+todos_simbolos[i]).then(resultado=>{
        data_API.push(resultado.data.financials)
      })
    })
    axios.get('https://financialmodelingprep.com/api/v3/financials/income-statement/'+simbolo).then(resultado=>{
      this.setState({
        //Criando uma variável Series && Categories e salvando no state da página 
        dados_empresa:resultado.data,
        series: listas_receita,
        categories:lista_de_datas[maior_lista_anos],
      })
    })    
  }

  render() {
    //Variável auxiliar que armazena os dados da API
    let data=this.state.dados_empresa.financials;

    //Condição para evitar que a página carregue as informações mais de uma vez e duplique os dados no array data_API
    if(data!==undefined && page_init===0){
      
      //funçao que remove os espacos das keys do array
      data_API.map(function(item,i){
        replaceKeys(data_API[i])
      })

      //laço responsavel por criar os objetos que serao enviados para o grafico && responsavel por criar uma lista de datas para o posicionamento dos dados no grafico
      for(let y=0;y<data_API.length;y++){

        //listas auxiliares
        let lista_aux=[]
        let lista_date_aux=[]
        let lista_date_aux2=[]

        //laço que cuida do vetor de dados
        for(let i=0;i<data_API[y].length;i++){
          lista_aux.push(parseFloat(data_API[y][i].Revenue))
          lista_date_aux.push(data_API[y][i].date)

          let split=lista_date_aux[i].split('-')
          let ano=parseInt(split[0])
        }

        //laço que cuida do vetor de datas
        for(let j=0;j<lista_date_aux.length;j++){
          let split=lista_date_aux[j].split('-')
          let ano=parseInt(split[0])
          lista_date_aux2.push(ano)
        }
        let obj = {name:todos_simbolos[y],data:lista_aux,ano:lista_date_aux2}
        let obj_ano={date:lista_date_aux2}
        listas_receita.push(obj);
        lista_de_datas.push(obj_ano)
        lista_date_aux2=[]
        lista_aux=[]
      }
      
      //Laço responsavel por descobrir o indice da maior lista de anos para montar o eixo X
      for(let y=0;y<lista_de_datas.length;y++){
        if(lista_de_datas[y].date.lengh>maior_lista_anos){
          maior_lista_anos=y;
        }
      }
      //----------------Função que move as linha do grafico pra frente ...Não funfou :( ------------------------------------------------------------------
      // let diference
      // for(let i=0;i<lista_de_datas.length;i++){
      //   if(i!=maior_lista_anos){
      //     diference= (listas_receita[maior_lista_anos].ano[0]-listas_receita[i].ano[0])
      //     //console.log(listas_receita[maior_lista_anos].ano[0]);
      //     //console.log(listas_receita[i].ano[0]);
      //     //console.log(diference);
      //   }
      //   for(let y=0;y<diference;y++){
      //     listas_receita[i].data.push(2500)
      //   }
      // }
      //---------------------------------------------------------------------------------------------------------------------------------------------------


      //Setando o eixo X com os anos da maior lista de anos
      this.state.categories=lista_de_datas[maior_lista_anos].date;
    
      page_init++;
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div>
            <HighchartsReact 
              highcharts={Highcharts}
              options={{
                title: {
                  text: 'Receita das empresas '+todos_simbolos,
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
                  categories:this.state.categories,
                }
              }}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}
