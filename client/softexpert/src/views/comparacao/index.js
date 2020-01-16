import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

//Import dos graficos
import GraphReceita from '../../components/graficos/graph_receita'
import GraphCrescReceita from '../../components/graficos/graph_crescimento_receita'
import GraphDespOperacion from '../../components/graficos/graph_despesas_operacionais'
import GraphMargemEbitda from '../../components/graficos/graph_margem_ebitda'
import GraphEbitda from '../../components/graficos/graph_ebitda'
import GraphRendaConsolidada from '../../components/graficos/graph_renda_consolidada'

import { Container } from './styles';
let simbolo_empresa=[]
let simbolo_empresa_filtrado=[]
let load_page=0

function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);
    simbolo_empresa=arrayOfStrings
    for(let i=0;i<arrayOfStrings.lenght;i++){
        simbolo_empresa.push(arrayOfStrings[i])
    }

    load_page++
    
}

export default class comparacao extends Component {
    render() {
    //logica para pegar os simbolos das empresas que vieram da tabela de empresas na página principal
    let link = window.location.href
    
    if(load_page===0){
        splitString(link,'/')
        simbolo_empresa.map(function(item,i){
            if(i>=4&&simbolo_empresa[i]!==''){
                // console.log(simbolo_empresa[i])
                simbolo_empresa_filtrado.push(simbolo_empresa[i])
            }
        })
        // console.log(simbolo_empresa_filtrado)
        for(let i=0;i<simbolo_empresa_filtrado.length;i++){
            // console.log(simbolo_empresa_filtrado[i])
        }
    }
    
    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphReceita simbolo={simbolo_empresa_filtrado}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphCrescReceita simbolo={simbolo_empresa_filtrado}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphDespOperacion simbolo={simbolo_empresa_filtrado}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphMargemEbitda simbolo={simbolo_empresa_filtrado}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphEbitda simbolo={simbolo_empresa_filtrado}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphRendaConsolidada simbolo={simbolo_empresa_filtrado}/>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
  }
}

//_____________________________________________________________
