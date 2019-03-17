import React, { Component } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import './App.css'
import "react-datepicker/dist/react-datepicker.css"
import Start from './components/Start'
import Chart from './components/Chart'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
      return (
        <div className="App">
           <BrowserRouter>
              <div>
                <Route exact  path="/" component={Start} />
                <Route path="/chart" component={Chart} />
              </div>
            </BrowserRouter>
        </div>
      );
  }
}

export default App;