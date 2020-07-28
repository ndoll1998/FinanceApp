import React from 'react'
// import Components
import Card from '../components/utils/Card'
import Slidable from '../components/utils/Slidable'
import { SecondaryButton as SecButton } from '../components/utils/Button'
import Header from '../components/Header'
import Nav from '../components/Navigation'
import StockInputForm from '../components/StockInputForm'
// import stylesheet
import './Template.css'


class Template extends React.Component {
    state = {
        stocks: [],
        providers: []
    }

    static getDerivedStateFromProps(props, state) {
        // dynamically update state on props change
        // build navigation items and copy provider-list
        state.nav_items = props.stocks.map(stock => ({
            title: stock.ticker, to: stock.targetURL, 
            onRemove: () => props.onRemoveStock(stock.ticker)
        }));
        state.providers = props.providers;
        // return state
        return state
    }

    constructor(props) {
        super(props);
        // create references
        this.loadStockPanel = React.createRef();
    }

    hideInputPanel = () => { this.loadStockPanel.current.slideOut(); }
    showInputPanel = () => { this.loadStockPanel.current.slideIn(); }

    render() { return (
        <div>
            <div className="left-span">
                <div className="load-button-container">
                    <SecButton className="load-button" onClick={this.showInputPanel}>
                        Load
                    </SecButton>
                </div>
                <Nav className="nav-stock" items={this.state.nav_items}/>
            </div>

            <div className="right-span">
                <Header><i className="fa fa-line-chart"></i> Finance App</Header>

                <Slidable ref={this.loadStockPanel} className="nice-center-spot">
                    <Card>
                        <StockInputForm 
                            providers={this.state.providers}
                            onSubmit={this.props.onLoadStock}
                        />
                    </Card>
                </Slidable>

                <div className="main">
                    { this.props.children }
                </div>
            </div>
        </div>
    )}


}

export default Template;