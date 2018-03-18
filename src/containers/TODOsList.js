import React, {Component} from 'react';
import {add, del, hideCompleted} from "../actions/Actions";
import {connect} from "react-redux";
import TODO from "../components/TODO";

class TODOsList extends Component {


    render() {

        const listItems = this.props.tasks.map((task) =>{

            return (
                <TODO ID={task.ID} text={task.text} completed={task.completed}/>
            )
        });

        return (
            <div className="Tasks-List">
                <div className="alignLeft">Tasks</div>
                <ul>{listItems}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.get('tasks').toJS()
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    remove: (id) => dispatch(del(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TODOsList);

