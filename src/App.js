import React, { Component } from 'react';
import './App.css';

import 'bulma/css/bulma.min.css';
import 'bulma-checkradio/dist/css/bulma-checkradio.min.css';
import './assets/css/fonts/typicons.min.css';
import './assets/css/main.css';
import '@material/snackbar/dist/mdc.snackbar.min.css';

import HeaderComponent from './components/layout/HeaderComponent/HeaderComponent';
import ContentComponent from './components/layout/ContentComponent/ContentComponent';

class App extends Component {
  render() {
    return (
        <div>
            <header><HeaderComponent/></header>
            <section><ContentComponent/></section>
        </div>
    );
  }
}

export default App;