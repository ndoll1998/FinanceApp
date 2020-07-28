import React from 'react'
import { v4 as uuid } from 'uuid'
// import components
import { PrimaryButton } from '../utils/Button'
// import stylesheet
import './ChooseAnalyser.css'

class ChooseAnalyser extends React.Component {

    constructor(props) {
        super(props);
        // create references
        this.analyserType = React.createRef();
    }

    onSubmit = () => {
        // get analyser type
        var type = this.analyserType.current.value;
        // callback function
        this.props.setType(type);
    }

    render() { return (
            <div className="choose-analyser-container">
                Choose an Analyser<br/>
                <select ref={this.analyserType}>
                    { this.props.options.map(analyser => 
                        <option 
                            key={uuid()} 
                            value={analyser.value}
                        >{analyser.title}</option>)
                    }
                </select>
                <PrimaryButton 
                    className="add-button" 
                    onClick={this.onSubmit}
                >Add Analyser</PrimaryButton>
            </div>
        )}
}

export default ChooseAnalyser;