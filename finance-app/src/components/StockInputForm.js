import React from 'react'
import {v4 as uuid} from 'uuid'
// import components
import { PrimaryButton as PrimButton } from './utils/Button'
// import stylesheet
import './StockInputForm.css'

class StockInputForm extends React.Component {

    constructor(props) {
        super(props);
        // create references
        this.ticker_input = React.createRef();
        this.provider_input = React.createRef();
    }

    onSubmit = () => {
        // get entered values
        var ticker = this.ticker_input.current.value.toUpperCase();
        var provider = this.provider_input.current.value;
        // check values
        if (ticker.length === 0) { return; }
        // call on-submit with variables
        this.props.onSubmit(ticker, provider);
        // clear input
        this.ticker_input.current.value = "";
    }

    render() {return (
        <div className={"stock-input-container"}>
            <input ref={this.ticker_input} type="text" placeholder="Ticker" autoComplete="off"/><br/>                
            <select ref={this.provider_input}>
                { this.props.providers.map(provider => <option key={uuid()}>{provider}</option>) }
            </select>
            <PrimButton className="submit-button" onClick={this.onSubmit}>Load Stock</PrimButton>
        </div>
    )}
}

export default StockInputForm;