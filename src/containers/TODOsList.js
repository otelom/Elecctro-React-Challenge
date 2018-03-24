import React, {Component} from 'react';
import {getList, del} from "../actions/Actions";
import {connect} from "react-redux";
import TODO from "../components/TODO";



class TODOsList extends Component {

    render() {
console.log("tasks no totodsList ",this.props.tasks);
    let listItems;
        if(this.props.tasks.length > 0) {
            console.log("entrei no if, a tasks e: ", this.props.tasks);
            console.log("index0 : ", this.props.tasks[0]);
            listItems = this.props.tasks.map((task) => {
                return (
                    <TODO id={task.id} text={task.text} state={task.state}/>
                )
            });

        }
            return (
                <div className="Tasks-List">
                    <ul>{listItems}</ul>
                </div>
            );

    }
}

const mapStateToProps = (state) => ({
    tasks: state.get('tasks').toJS()
});


export default connect(mapStateToProps)(TODOsList);

