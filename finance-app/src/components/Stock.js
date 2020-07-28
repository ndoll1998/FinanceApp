import React from 'react'
import Chart from 'react-apexcharts'
// import stylesheet
import './Stock.css'

class Stock extends React.Component {
    state = {
        stockInfo:{ ticker: "", provider: "" },
    }

    static getDerivedStateFromProps(props, state) {
        return { ...state, stockInfo: props.stockInfo }
    }

    csv2series = (csv) => {
        // split csv into lines
        var lines = csv.split('\n');
        // first line is header
        var columns = lines[0].split(',');
        lines.shift();
        // get column-indices
        var idx_map = {
            Date:  columns.indexOf('Date'),
            Open:  columns.indexOf('Open'),
            High:  columns.indexOf('High'),
            Low:   columns.indexOf('Low'),
            Close: columns.indexOf('Close')
        }

        var data = [];
        lines.forEach(line => {
            // get values
            var values = line.split(',');
            // populate data
            data.push({
                x: Date.parse(values[idx_map.Date]),
                y: [
                    parseFloat(values[idx_map.Open]), 
                    parseFloat(values[idx_map.High]), 
                    parseFloat(values[idx_map.Low]), 
                    parseFloat(values[idx_map.Close])
                ]
            });
        });

        // create series from data
        var series = [{data: data}];
        return series;
    }

    componentDidMount() {
        // fetch data from backend
        fetch(`http://localhost:5000/stock/pull` + 
            `?ticker=${this.state.stockInfo.ticker}` +
            `&provider=${this.state.stockInfo.provider}`
        )
            .then(resp => resp.json())
            .then(data => this.csv2series(data['csv']))
            .then(series => this.setState({ series }));
    }
  
    render() { 
        // return empty card if no data is given
        if (this.state.series === undefined)
            return ( <div className="stock-container">{this.state.stockInfo.ticker}</div> )
        
        // create options
        var options = {
            chart: { type: 'candlestick', },
            xaxis: { type: 'datetime' },
            yaxis: { tooltip: { enabled: true } }
        };
        // render
        return (
            <div className="stock-container">
                <div className="inner">
                    { this.state.stockInfo.ticker }
                    <Chart 
                        options={options}
                        series={this.state.series}
                        type="candlestick"
                        width="100%"
                        height="450px"
                    />
                </div>
            </div>  
        );
    }
}

export default Stock;