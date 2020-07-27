import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
// import pages
import Template from './pages/Template'
import DetailView from './pages/DetailView'

class App extends React.Component {
    state = {
        stocks: [
            { ticker: "TSLA", url: "/full/TSLA" },
            { ticker: "AAPL", url: "/full/AAPL" },
            { ticker: "GOOGL", url: "/full/GOOGL" },
        ],
        providers: ["yahoo", "other"]
    }

    constructor(props) {
        super(props);
        // create references
        this.template = React.createRef();
    }

    onLoadStock = (ticker, provider) => {
        // update state and with it all components
        var stock = {ticker, url: "/" + ticker}
        this.setState({stocks: [...this.state.stocks, stock]})
        // hide input panel
        this.template.current.hideInputPanel();
    }

    render() {
        return (
            <BrowserRouter>
                <Template 
                    ref={this.template}
                    stocks={this.state.stocks}
                    providers={this.state.providers}
                    onLoadStock={this.onLoadStock}
                >
                    {
                        this.state.stocks.map(stock => (
                            <Route exact path={stock.url}>
                                <DetailView stock={stock} />
                            </Route>
                        ))
                    }
                </Template>
            </BrowserRouter>
        );
    }

}

export default App;
