import React, {Component} from 'react';
import {connect} from "react-redux";
import {del, edit} from "../actions/Actions";


class TODO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            text: props.text
        };
    }

    _handleKeyPress = function(e) {
        if (e.key === 'Enter' && this.state.text !== '') {
            this.props.editTODO(this.props.ID, this.state.text)
            this.setState({editMode: false})
        }
    };

    checkEditMode()  {
        if (!this.state.editMode)
            return this.props.text;
        else
            return <input
                type="text"
                value={this.state.text}
                onChange={(e) => this.setState({text: e.target.value})}
                placeholder={"Type here a new TODO"}
                onKeyPress={this._handleKeyPress.bind(this)}
            />;

    }

    render() {

        return (
            <li className="item" key={this.props.ID} onClick={() => this.setState({editMode: true})}>
                {this.checkEditMode()}
                <span onClick={(event) => {this.props.remove(this.props.ID); event.stopPropagation();}}>×</span>
            </li>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    remove: (id) => dispatch(del(id)),
    editTODO: (id, text) => dispatch(edit(id, text))
});

export default connect(null, mapDispatchToProps)(TODO);
