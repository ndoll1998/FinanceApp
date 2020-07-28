import React from 'react'
// import analysers
import ChooseAnalyser from './ChooseAnalyser'
import ArticleAnalyser from './ArticleAnalyser'
import LSTMAnalyser from './LSTMAnalyser'

var analysers = [
    {value: "article", title: "Article Analyser"},
    {value: "lstm", title: "LSTM Analyser"}
]

class Analyser extends React.Component {
    state = { type: "choose" }

    static getDerivedStateFromProps(props, state) {
        // update type if given
        if (props.type)
            state.type = props.type;
        // return state
        return state;
    }

    render() { 
        switch(this.state.type) {
            case "choose":
                // render ChooseAnalyser
                return (<ChooseAnalyser setType={this.props.onSetType} options={analysers} />);
            case "article":
                // render ArticleAnalyser
                return (<ArticleAnalyser />)
            case "lstm":
                // render ArticleAnalyser
                return (<LSTMAnalyser />)  
            default: 
                return (<div>Could not find Analyser</div>);
        };
    }
}

export default Analyser;