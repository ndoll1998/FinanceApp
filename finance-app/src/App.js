import React from 'react';
import {Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
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
        var targetURL = "/full/" + ticker;
        // update state and with it all components
        var stock = {ticker, provider, targetURL}
        this.setState({stocks: [...this.state.stocks, stock]})
        // hide input panel
        this.template.current.hideInputPanel();
        // load page
        this.history.push(targetURL);
    }

    removeStock = (ticker) => {
        // find stock with ticker
        var i = this.state.stocks.findIndex(stock => stock.ticker === ticker);
        // remove stock at index
        this.state.stocks.splice(i, 1);
        this.setState({ stocks: this.state.stocks });
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
                            <Route exact path={stock.targetURL} key={stock.ticker}>
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
