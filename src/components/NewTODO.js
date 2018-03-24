import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from '../actions/Actions'

class NewTODO extends Component {

    constructor() {
        super();
        this.state = {
            text: ''
        };
    }

    _handleKeyPress = function(e) {
        if (e.key === 'Enter') {
            this.addFunction();
        }
    };

    addFunction(){
        if(this.state.text !== '') {
            this.props.addTODO(this.state.text);
            this.setState({text: ''});
        }
    };

  render() {
    return (
      <div className="New-Task">
          <input
              type="text"
              value={this.state.text}
              onChange={(e) => this.setState({text: e.target.value})}
              placeholder={"Type here a new TODO"}
              onKeyPress={this._handleKeyPress.bind(this)}
          />
          <button
              className="addBtn"
              onClick={this.addFunction.bind(this)}>
              Adicionar
          </button>
      </div>
  );
  }
}

const mapStateToProps = (state) => ({
    tasks: state.get('tasks')
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    addTODO: (text) => dispatch (add(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTODO);