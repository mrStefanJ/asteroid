import React, { Component } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../App.css'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from 'react-datepicker'
import Table from './Table'

class Start extends Component {
  constructor(props) {
    super( props );
    this.state = {
      posts: [],
      show: false,
    };
  } 

  handleChangeStart(date) {
    this.setState({
      startDate: date,
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }

  toggleDate = () => {
    const { show } = this.state;
    const rowArray = [];
    const startDate = this.state.startDate.toISOString().slice(0,10);

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.state.startDate.toISOString().slice(0,10)}&end_date=${this.state.endDate.toISOString().slice(0,10)}&api_key=x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2`)
      .then(res => res.json())
      .then(data => {
          const asteroidData = data.near_earth_objects;
            asteroidData[startDate].map((val) => {
                rowArray.push(
                  {
                    datum: val.close_approach_data[0].close_approach_date,
                    ime: val.name,
                    per_hour: val.close_approach_data[0].relative_velocity.kilometers_per_hour,
                    min: val.estimated_diameter.meters.estimated_diameter_min,
                    max: val.estimated_diameter.meters.estimated_diameter_max,
                    link: val.links.self,
                  }
              )
            })
            this.setState( { 
              show : !show,
              rowData: rowArray,
             } )
        })
  }

  addDays(startDate, amount) {
    return new Date(startDate.setDate(startDate.getDate() + amount));
  }

  render() {
      return (
        <div className="App">
         <div className="App-space">Start Date:<div><DatePicker
              selected={this.state.startDate}
              selectsStart
              startDate={new Date()}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart.bind(this)}
          /></div></div>
          <div className="App-space">End Date:<div><DatePicker
              selected={this.state.endDate}
              selectsEnd
              minDate={this.state.startDate}
              maxDate={this.addDays(new Date(), 7)}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeEnd.bind(this)}
          /></div></div>
          <div className="App-intro">
            <button onClick={ this.toggleDate.bind(this) }>Prikazi Asteroide</button>
            <br /><br />
              { this.state.show && <Table params={this.state.rowData} /> }
          </div>
        </div>
      );
  }
}

export default Start;