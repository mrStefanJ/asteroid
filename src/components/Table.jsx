import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import './Table.css'

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        columnDefs: [
          {headerName: "Datum", field: "datum"},
          {headerName: "Ime", field: "ime"},
          {headerName: "Brzina Kretanja (km/h)", field: "per_hour"},
          {headerName: "Min. Precnik (m)", field: "min"},
          {headerName: "Max. Precnik (m)", field: "max"}
        ],
        data: props.params,
      }
  }

  removeItem(el){
    this.setState(prevState => ({
        data: prevState.data.filter(val => val !== el )
    }));
  }

  setColor(number) {

    if( number < 25) {
      return 'green'
    }

    if(25 < number && number < 45) {
      return 'yellow'
    }

    if(45 < number && number < 75) {
      return 'orange'
    }

    if( number > 75) {
      return 'red'
    }
  }

  calculatePasses(params) {
    const totalAmount = []

    params.map((value, index) => {
      const link = value.link;
      fetch(link).then(res => res.json()).then(data => {
        const counter = data.close_approach_data.filter(val => val.close_approach_date.slice(0,2) === '19');
        if (counter.length) {
          totalAmount.push({name: data.name, count:counter.length, color: this.setColor(counter.length)})
        }
        if( index === params.length - 1) {
          localStorage.setItem('myItem', JSON.stringify(totalAmount));
          
          window.location = `/chart/`;
        }
      });
    });
  }
  
  render() {
    return (
      <div className="ag-theme-balham">
        <AgGridReact
          pagination={true}
          paginationPageSize={10}
          enableSorting={true}
          columnDefs={this.state.columnDefs}
          rowData={this.props.params}>
        </AgGridReact>         
        <div className="asteroid-name">
          {this.state.data.map((value,index) => {
            return ( <p className={`asteroid-${index}`} key={index}>{value.ime}<button className="asteroid-icon" onClick={() => {
              this.removeItem(value)}}><i className="far fa-trash-alt"></i></button></p>
            )})}
        </div>
        <div>
          <button onClick={ () => { this.calculatePasses(this.props.params || 0)} }>Broj Prolazaka pored Zemlje</button> 
        </div>
      </div>
    );
  }
}
export default Table