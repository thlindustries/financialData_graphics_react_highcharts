//Imports do Material-Ui
import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

//icones
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';

//API
import axios from 'axios';

//Variavies para manipulação de dados
let load_page=0;
let opcao=0;
let lista_pesquisa=[]


//styles
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#7d5f8a',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

//paginação da tabela
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
    for(let x=0;x<lista_pesquisa.length;x++){
      setTimeout(function(){ 
        if(document.getElementById('check'+lista_pesquisa[x])!=null){
          document.getElementById('check'+lista_pesquisa[x]).click()
        }
      }, 100);
      
      console.log('check'+lista_pesquisa[x])
    }
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
    for(let x=0;x<lista_pesquisa.length;x++){
      setTimeout(function(){ 
        if(document.getElementById('check'+lista_pesquisa[x])!=null){
          document.getElementById('check'+lista_pesquisa[x]).click()
        }
      }, 100);
      
      //console.log('check'+lista_pesquisa[x])
    }
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
    for(let x=0;x<lista_pesquisa.length;x++){
      setTimeout(function(){ 
        if(document.getElementById('check'+lista_pesquisa[x])!=null){
          document.getElementById('check'+lista_pesquisa[x]).click()
        }
      }, 100);
      
      //console.log('check'+lista_pesquisa[x])
    }
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    for(let x=0;x<lista_pesquisa.length;x++){
      setTimeout(function(){ 
        if(document.getElementById('check'+lista_pesquisa[x])!=null){
          document.getElementById('check'+lista_pesquisa[x]).click()
        }
      }, 100);
      
      //console.log('check'+lista_pesquisa[x])
    }
  };

  //Elemento da paginação
  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

//funcao para criar o array de dados vindos da API
function createData(name, simbolo, cotacao) {
  return { name, simbolo, cotacao };
}

//Criação de uma lista que armazenará as linhas da tabela
const rows = []

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
    height:250,
  },
});

export default function CustomPaginationActionsTable(dados) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //Observer do checkbox
  const checkChange=(id,option)=>{
    if(document.getElementById('check'+id).checked===true){
      console.log("Empresa "+id+ " esta selecionada")
      // console.log("Empresa "+id+ " adicionada a pesquisa");
      // opcao++;
      if(!lista_pesquisa.includes(id)){
        lista_pesquisa.push(id)
      }
      
    }
    else{
      console.log("Empresa "+id+ " foi removida");
      // opcao=0;
      for( var y = lista_pesquisa.length; y--;){
        if ( lista_pesquisa[y] === id) lista_pesquisa.splice(y, 1);
      }
    }

    
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  let data=dados.dados.dados.dados.symbolsList

  //Condição para que a página nao carregue as informações 2 vezes e não duplique os itens da tabela ao clicar pra avançar pagina na mesma
  if(data!==undefined && load_page===0){
    data.map(function(item,i){
      rows.push(createData(data[i].name,data[i].symbol,data[i].price))
    })
    rows.sort((a, b) => (a.simbolo < b.simbolo ? -1 : 1));
    load_page=1;
  }

  return (
    <Grid >
      <Grid item xs={12}>
        <div style={{height:100}}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Comparar</StyledTableCell>
                  <StyledTableCell>Nome da empresa</StyledTableCell>
                  <StyledTableCell align="right">Símbolo</StyledTableCell>
                  <StyledTableCell align="right">Cotação atual</StyledTableCell>
                  <StyledTableCell align="right">Graficos</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map(row => (//
                    <TableRow key={row.name}><TableCell component="th" scope="row">
                      <Checkbox  id={'check'+row.simbolo} onClick={()=>{
                        checkChange(row.simbolo,opcao)
                        console.log(lista_pesquisa)
                      }}/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.simbolo}</TableCell>
                    <TableCell align="right">{row.cotacao}</TableCell>
                    <TableCell align="right">
                      <Fab size ='small'color="secondary" aria-label="add" id={'button'+row.simbolo} onClick={() => { 
                          // console.log('Voce apertou o botao '+row.simbolo); 
                          window.location.href = "/graficos/"+row.simbolo;
                        }}>
                        <PlayCircleOutlineIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
                

                {emptyRows > 0 && (
                  <TableRow style={{ height: 15 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <br/>
          <Fab style={{marginLeft:'42%'}}color="primary" variant="extended" onClick={() => { 
                console.log('Voce apertou o botao para comparar as empresas '+ lista_pesquisa); 
                let url=''
                lista_pesquisa.map(function(item,i){
                  axios.get('https://financialmodelingprep.com/api/v3/financials/income-statement/'+lista_pesquisa[i]).then(resultado=>{
                    if(resultado.data.financials===undefined){
                      alert('A API retornou um objeto vazio da empresa '+lista_pesquisa[i]+' !');
                      //simbolo_empresa.splice(i, 1);
                    }
                    else{
                      // for(let i=0;i<lista_pesquisa.length;i++){
                        url=url+lista_pesquisa[i]+'/'
                      // }
                      console.log(url)
                      window.location.href = "/comparar/"+url;
                    }
                  })
                })
                
                
                
              }} >
            <CompareArrowsIcon className={classes.extendedIcon} />
            Comparar Empresas
          </Fab>
        </div>
        
      </Grid>
    </Grid>
    
  );
}