import React, {Component} from 'react';
import {connect} from "react-redux";
import {check, uncheck, del, edit} from "../actions/Actions";

const COMPLETE = 'COMPLETE';

class TODO extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            text: props.text,
            class: props.state === COMPLETE ? 'checked item' : 'item'
        };
    }

    _handleKeyPress = function(e) {
        if (e.key === 'Enter' && this.state.text !== '') {
            this.props.editTODO(this.props.id, this.state.text)
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

    componentWillReceiveProps(nextProps){
        this.setState({class: nextProps.state === COMPLETE ? 'checked item' : 'item'})
    }

    handleStatusChange(event){
        if(this.props.state === 'INCOMPLETE'){
            this.props.check(this.props.id);
        }
        else{
            this.props.uncheck(this.props.id);
        }
        event.stopPropagation();
    }

    render() {

        return (
            <li className={this.state.class} key={this.props.id} onClick={() => this.setState({editMode: true})}>
                <span className="check" onClick={(event) => this.handleStatusChange(event)}>✓</span>
                <span className="text"> {this.checkEditMode()} </span>
                <span className="delete" onClick={(event) => {this.props.remove(this.props.id); event.stopPropagation();}}>×</span>
            </li>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    remove: (id) => dispatch(del(id)),
    editTODO: (id, text) => dispatch(edit(id, text)),
    check: (id) => dispatch(check(id)),
    uncheck: (id) => dispatch(uncheck(id))
});

export default connect(null, mapDispatchToProps)(TODO);
