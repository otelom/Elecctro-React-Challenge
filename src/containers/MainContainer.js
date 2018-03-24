import React, {Component} from 'react';
import NewTODO from '../components/NewTODO';
import List from './TODOsList';
import {connect} from "react-redux";
import {getList} from "../actions/Actions";

const INCOMPLETE = "INCOMPLETE";
const ALL = "ALL";
const AZ = "AZ";
const ZA = "ZA";
const DESCRIPTION = 'DESCRIPTION';
const DATE_ADDED = "DATE_ADDED";

class MainContainer extends Component {

    constructor() {
        super();
        this.state = {
            hideSelectedOption: false,
            order: '',
            orderBy: DATE_ADDED,
            filter: ALL
        };
    }

    componentWillMount() {
        this.props.reOrder(this.props.orderBy, this.props.filter);
    }

    handleReOrderRequest(){
            switch (this.state.orderBy) {
                case DATE_ADDED: {
                    this.setState({order: AZ, orderBy: DESCRIPTION});
                    this.props.reOrder(DESCRIPTION, this.state.filter);
                    break;
                }
                case DESCRIPTION: {
                    switch (this.state.order) {
                        case AZ: {
                            this.setState({order: ZA});
                            this.props.reOrder(DESCRIPTION, this.state.filter, ZA);
                            break;
                        }
                        case ZA: {
                            this.setState({order: '', orderBy: DATE_ADDED});
                            this.props.reOrder(DATE_ADDED, this.state.filter);
                        }
                    }
                }
            }
    }

    handleClick(){
        // since the state has not yet been updated, we need to do the opposite, if it's not checked we will
        // update the filter key as if it were checked because we know that the state will change on the next line
        this.state.hideSelectedOption ? this.setState({filter: ALL}) : this.setState({filter: INCOMPLETE});
        this.setState({hideSelectedOption: !this.state.hideSelectedOption});
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.hideSelectedOption !== this.state.hideSelectedOption) {
            console.log("did update, reordering now...");
            console.log("also, new keys are: ", this.state.orderBy,this.state.filter);
        //  this.state.hideSelectedOption ? this.setState({filter: INCOMPLETE}) : this.setState({filter: ALL});
            this.props.reOrder(this.state.orderBy, this.state.filter, this.state.order)
        }
    }

    render() {
        //  return null;
        return (
            <div className="container">
                <div className="newTODO">
                    <NewTODO/>
                </div>

                <div className="subtitle alignLeft" onClick={() => this.handleReOrderRequest()}>Tasks</div>
                <div className="TODOsList">
                    <List/>
                </div>
                <div className="settings alignLeft">
                    Hide completed
                    <input
                        name="hideCompleted"
                        type="checkbox"
                        checked={this.state.hideSelectedOption}
                        onClick={() => this.handleClick()}
                    />
                </div>
            </div>
        );
    }
}


/*const mapStateToProps = (state) => ({
    tasks: state.get('tasks').toJS()
});*/
const mapDispatchToProps = (dispatch, ownProps) => ({
    reOrder: (orderBy, filter, order = '') => dispatch(getList(orderBy, filter, order))
});

export default connect(null, mapDispatchToProps)(MainContainer);