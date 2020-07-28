import React from 'react';
import {Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import {v4 as uuid} from 'uuid'
// import pages
import Template from './pages/Template'
import DetailView from './pages/DetailView'

class App extends React.Component {
    state = {
        stocks: [
            { ticker: "TSLA", provider: "yahoo", targetURL: "/full/TSLA" },
            { ticker: "AAPL", provider: "yahoo", targetURL: "/full/AAPL" },
            { ticker: "GOOGL", provider: "yahoo", targetURL: "/full/GOOGL" },
        ],
        providers: ["yahoo", "other"]
    }

    constructor(props) {
        super(props);
        // create references
        this.template = React.createRef();

        // create a browser-history instance
        this.history = createBrowserHistory();
    }

    loadStock = (ticker, provider) => {
        var targetURL;
        // check if stock is already loaded
        if (this.state.stocks.find(stock => stock.ticker === ticker)) {
            // get index of stock
            var i = this.state.stocks.findIndex(stock => stock.ticker === ticker);
            // redirect to page
            targetURL = this.state.stocks[i].targetURL;
        } else {
            targetURL = "/full/" + ticker;
            // update state and with it all components
            var stock = {ticker, provider, targetURL}
            this.setState({stocks: [...this.state.stocks, stock]})
        }
        // hide input panel and load page
        this.template.current.hideInputPanel();
        this.history.push(targetURL);
    }

    removeStock = (ticker) => {
        // find stock with ticker
        var i = this.state.stocks.findIndex(stock => stock.ticker === ticker);
        // copy stocks and remove stock at index
        var stocks = this.state.stocks.slice();
        stocks.splice(i, 1);
        // update state
        this.setState({ stocks });
    }

    render() {
        return (
            <Router history={this.history}>
                <Template 
                    ref={this.template}
                    stocks={this.state.stocks}
                    providers={this.state.providers}
                    onLoadStock={this.loadStock}
                    onRemoveStock={this.removeStock}
                >
                    {
                        this.state.stocks.map(stock => (
                            <Route exact path={stock.targetURL} key={uuid()}>
                                <DetailView stock={stock} />
                            </Route>
                        ))
                    }
                </Template>
            </Router>
        );
    }

}

export default App;
