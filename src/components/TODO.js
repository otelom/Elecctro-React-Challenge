import React, {Component} from 'react';
import {connect} from "react-redux";
import {check, del, edit} from "../actions/Actions";


class TODO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            text: props.text,
            class: props.completed ? 'checked item' : 'item'
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

    componentWillReceiveProps(){
        this.setState({class: this.props.completed ? 'checked item' : 'item'})
    }

    render() {


        return (
            <li className={this.state.class} key={this.props.ID} onClick={() => this.setState({editMode: true})}>
                <span className="check" onClick={(event) => {this.props.check(this.props.ID); event.stopPropagation();}}>✓</span>
                <span className="text"> {this.checkEditMode()} </span>
                <span className="delete" onClick={(event) => {this.props.remove(this.props.ID); event.stopPropagation();}}>×</span>
            </li>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    remove: (id) => dispatch(del(id)),
    editTODO: (id, text) => dispatch(edit(id, text)),
    check: (id) => dispatch(check(id))
});

export default connect(null, mapDispatchToProps)(TODO);
