import React from 'react'
import {v4 as uuid} from 'uuid'
// import components
import Card from '../components/utils/Card'
import Separator, { SeparatorButton} from '../components/utils/Separator'
import Stock from '../components/Stock'
import Analyser from '../components/analysers/Analyser'
// import stylesheet
import './DetailView.css'

class DetailView extends React.Component {
    state = { 
        stock: { ticker: "", provider: "" },
        analysers: [] //["article", "lstm"]
    }

    static getDerivedStateFromProps(props, state) {
        // update state with stock from props
        return { ...state, stock: {
                ticker: props.stock.ticker, 
                provider: props.stock.provider
                } 
            }
        }

    componentDidMount() {
        // TODO: load all analysers
    }

    onAddAnalyser = () => {
        // create a new chooseAnalyser instance 
        // initial analyser instance is chooseAnalyser
        this.setState({analysers: [...this.state.analysers, "choose"]});
    }

    onSetType = (i, type) => {
        // copy analysers and replace type at given index
        var analysers = this.state.analysers.slice();
        analysers.splice(i, 1, type);
        // update state
        this.setState({analysers});
    }

    render() { return (
            <div>
                <div>
                    <Card><Stock stockInfo={this.state.stock} /></Card>
                    <Separator title="Analysers" />
                    { this.state.analysers.map((type, i) => (
                            <Card key={uuid()}><Analyser 
                                type={type} 
                                onSetType={(t) => this.onSetType(i, t)} 
                            /></Card>
                        ))
                    }
                </div>

                <SeparatorButton 
                    title="Add Analyser" 
                    onButtonClick={this.onAddAnalyser} 
                />
            </div>
        )}
}

export default DetailView;