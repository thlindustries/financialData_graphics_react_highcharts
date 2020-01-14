import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#7d5f8a',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, simbolo, cotacao) {
  return { name, simbolo, cotacao };
}

const rows = [
  createData('Empresa teste 1', 159, 6.0),
  createData('Empresa teste 2', 237, 9.0),
  createData('Empresa teste 3', 262, 16.0),
  createData('Empresa teste 4', 305, 3.7),
  createData('Empresa teste 5', 356, 16.0),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(dados) {
  const classes = useStyles();

  if(dados!=null){
    let data=dados.dados.dados.dados
    console.log(data.stockList);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome da empresa</StyledTableCell>
            <StyledTableCell align="right">Símbolo</StyledTableCell>
            <StyledTableCell align="right">Cotação atual</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.simbolo}</StyledTableCell>
              <StyledTableCell align="right">{row.cotacao}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}