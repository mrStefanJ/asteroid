import React, {Component} from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import './Chart.css';

class Chart extends Component {
    constructor(props) {
        super(props);
        const Item = JSON.parse(localStorage.getItem('myItem'));
        const name = Item.map(val => val.name);
        const times = Item.map(val => val.count);
        const colors = { 
            red : 'rgb(255, 0, 0)',
            green: 'rgb(51, 204, 51)',
            orange: 'rgb(255, 153, 51)',
            yellow: 'rgb(255, 255, 0)',
        }
        const selectedColors = Item.map( val => colors[val.color])
        this.state = {
            chartData:{
                labels: name,
                datasets:[
                    {
                        label:'Population',
                        data: times,
                        backgroundColor: selectedColors
                    }
                ]
            }
        }
    }

    render() {
        return (
        <div className="chart">
        <div>
            <a href='/'>Nazad</a>
        </div>
        <HorizontalBar 
            data={this.state.chartData}
            options={{
                layout:{
                    padding:{
                        left:10,
                        right:0,
                        bottom:20,
                        top:0
                    }
                },
                scales: {
                    xAxes:[{
                        ticks: {
                            min:0,
                        }
                    }]
                }
            }}
        />
        </div>
        )
    }
}

export default Chart;