// import React from 'react';

// //componentes
// import Header from './components/header'

// function App() {
//   return (
//     <div className="App">
//       <Header/>
//     </div>
//   );
// }

// export default App;


import React, { Component } from 'react';

//componentes
import Header from './components/header';

//API
import axios from 'axios';

//styles
import GlobalStyle from './styles/global';

//Rotas
import {BrowserRouter} from 'react-router-dom';

export default class src extends Component {

  constructor(props) {
    super(props);

    this.state={
      resultado_dados:[]
    }

    axios.get('https://financialmodelingprep.com/api/v3/company/stock/list').then(resultado=>{
      this.setState({
        resultado_dados:resultado.data
      })
      //console.log(resultado.data)
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <GlobalStyle/>
          <Header dados={this.state.resultado_dados}/>
        </div>
      </BrowserRouter>
    );
  }
}
