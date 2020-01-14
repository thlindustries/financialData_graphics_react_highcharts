import React from 'react';
import Tabela from '../../components/tabela'

// import { Container } from './styles';

export default function principal_menu(dados) {
  return (
    <div>
  <Tabela dados={dados}></Tabela>
    </div>
  );
}
