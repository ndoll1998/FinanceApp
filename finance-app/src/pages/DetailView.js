import React from 'react'
import StockCard from '../cards/StockCard'
// import stylesheet
import './DetailView.css'

class DetailView extends React.Component {
    state = { stock: { ticker: "", provider: "" } }

    static getDerivedStateFromProps(props, state) {
        // update state with stock from props
        return { ...state, stock: {
                ticker: props.stock.ticker, 
                provider: props.stock.provider
            } 
        }
    }

    render() { return (
            <div>
                <StockCard stockInfo={this.state.stock} />
            </div>
        )}
}

export default DetailView;