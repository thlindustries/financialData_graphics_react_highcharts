
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

let teste=[]

let lista_de_datas=[];
let menor_ano
let maior_lista_anos=0;
let data_API=[];

//função que remove os espaços das Keys do JSON retornado pela API
function replaceKeys(object) {
    if(object!==undefined){
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
        data_API.unshift(resultado.data.financials)

        teste.unshift(todos_simbolos[i])
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
        if(data_API[i]!==undefined){
          replaceKeys(data_API[i])
        }
      })

      //laço responsavel por criar os objetos que serao enviados para o grafico && responsavel por criar uma lista de datas para o posicionamento dos dados no grafico
      for(let y=0;y<data_API.length;y++){

        //listas auxiliares
        let lista_aux=[]
        let lista_date_aux=[]
        let lista_date_aux2=[]

        //laço que cuida do vetor de dados
        if(data_API[y]!==undefined){
          for(let i=0;i<data_API[y].length;i++){
            lista_aux.unshift(parseFloat(data_API[y][i].Revenue))
            lista_date_aux.unshift(data_API[y][i].date)            
          }
        }
        
        //laço que cuida do vetor de datas
        for(let j=0;j<lista_date_aux.length;j++){
          let split=lista_date_aux[j].split('-')
          let ano=parseInt(split[0])
          lista_date_aux2.unshift(ano)
        }
        let obj = {name:teste[y],data:lista_aux,ano:lista_date_aux2}
        let obj_ano={date:lista_date_aux2}
        listas_receita.unshift(obj);
        lista_de_datas.unshift(obj_ano)
        lista_date_aux2=[]
        lista_aux=[]
      }
      
      //Laço responsavel por descobrir o indice da menor lista de anos para montar o eixo X
      let aux_tamanhos=[]
      lista_de_datas.map(function(item,i){
        if(lista_de_datas[i].date.length!==undefined){
          aux_tamanhos.unshift(lista_de_datas[i].date[lista_de_datas[i].date.length-1])
        }
      })
      menor_ano=Math.min(...aux_tamanhos.sort((a, b) => a - b))
      aux_tamanhos.map(function(item,i){
        if(aux_tamanhos[i]===menor_ano){
          maior_lista_anos=i    
        }
      })

      //----------------Função que move as linhas do grafico pra frente para o dado bater com seu respectivo ano-------------------------------------------
      listas_receita.map(function(item,i){
        if(listas_receita[i].ano[lista_de_datas[i].date.length-1]>menor_ano){
          let diference = (listas_receita[i].ano[lista_de_datas[i].date.length-1]-menor_ano)
          for(let y=0;y<diference;y++){
            listas_receita[i].data.unshift(null)
          }
        }
      })
      //---------------------------------------------------------------------------------------------------------------------------------------------------


      //Setando o eixo X com os anos da maior lista de anos
      this.state.categories=lista_de_datas[maior_lista_anos].date;
      this.state.categories.unshift(menor_ano)
    
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
                  categories:[2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]
                  // this.state.categories,
                }
              }}
            />
          </div>
        </Grid>
      </Grid>
    );
  }
}
