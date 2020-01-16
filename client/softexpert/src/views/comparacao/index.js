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

export default class comparacao extends Component {
  render() {
    return (
        <Container>
            <Grid container spacing={1}>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphReceita/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphCrescReceita/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphDespOperacion/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphMargemEbitda/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphEbitda/>
                        </div>
                    </Grid>
                </Grid>
                <Grid item x={6}>
                    <Grid container justify="center" spacing={1}>
                        <div>
                            <GraphRendaConsolidada/>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
  }
}

//_____________________________________________________________
