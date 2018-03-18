import React, {Component} from 'react';
import NewTODO from '../components/NewTODO';
import List from './TODOsList';

class MainContainer extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: 'option2',
            hideSelectedOption: false
        };
    }


    render() {
        //  return null;
        return (
            <div className="container">
                <div className="newTODO">
                    <NewTODO/>
                </div>
                <div className="settings">
                        Hide completed
                        <input
                            name="hideCompleted"
                            type="checkbox"
                            checked={this.state.hideSelectedOption}
                            onClick={() => this.setState({hideSelectedOption: !this.state.hideSelectedOption})}
                        />
                        Criação
                        <input type="radio" checked={this.state.selectedOption === 'option1'}
                               onChange={() => this.setState({selectedOption: 'option1'})}/>
                        A-Z
                        <input type="radio" checked={this.state.selectedOption === 'option2'}
                               onChange={() => this.setState({selectedOption: 'option2'})}/>
                        Z-A
                        <input type="radio" checked={this.state.selectedOption === /** @type {string} */ 'option3'}
                               onChange={() => this.setState({selectedOption: 'option3'})}/>
                </div>
                <div className="TODOsList">
                    <List/>
                </div>
            </div>
        );
    }
}

export default MainContainer;