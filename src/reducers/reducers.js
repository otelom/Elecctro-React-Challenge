import * as Actions from '../actions/Actions'
import {List, Map} from 'immutable';

const COMPLETE = "COMPLETE";
const INCOMPLETE = "INCOMPLETE";
const ZA = "ZA";
const initialState = Map({
    tasks: List([]),
    hideCompleted: true,
    order: 'creation'
});

function arrayToMap(list){
console.log("lista: ",list);
    let tmpList = list.map((todo) => {
        console.log("id ", todo.id);
        return Map({id: todo.id, text: todo.description, state: todo.state});
        }
    )
    return List(tmpList);
    }

export default (state = initialState, action) => {



    let index, TODO, newTODOsList;

    switch (action.type) {
        case Actions.Types.ADD_TODO:
            return state.set('tasks', state.get('tasks').push(Map({id: action.id, text: action.text, state: action.state})));

        case Actions.Types.EDIT_TODO:
            index = state.get('tasks').findIndex((task) => task.get('id') === action.id);
            TODO = state.get('tasks').get(index).set('text',action.text);
            newTODOsList = state.get('tasks').set(index,TODO);
            return state.set('tasks', newTODOsList);

        case Actions.Types.CHECK:
            console.log("final");
            index = state.get('tasks').findIndex((task) => task.get('id') === action.id);
            TODO = state.get('tasks').get(index).set('state', COMPLETE);
            newTODOsList = state.get('tasks').set(index,TODO);
            return state.set('tasks', newTODOsList);



        case Actions.Types.MARK_INCOMPLETE:
            index = state.get('tasks').findIndex((task) => task.get('id') === action.id);
            TODO = state.get('tasks').get(index).set('state', INCOMPLETE);
            newTODOsList = state.get('tasks').set(index,TODO);
            return state.set('tasks', newTODOsList);

        case Actions.Types.DELETE_TODO:
            index = state.get('tasks').findIndex((task) => task.get('id') === action.id);
            return state.set('tasks', state.get('tasks').delete(index));

        case Actions.VisibilityFilters.HIDE_COMPLETED:
            return state.set('hideCompleted', action.hide)

        case Actions.VisibilityFilters.ORDER: {
            console.log("lista no reducer ", action.list)
            if(action.order===ZA)
                return state.set('tasks', arrayToMap(action.list.reverse()));
            else
                return state.set('tasks', arrayToMap(action.list));
        }

        default:
            return state;
    }
}
