import * as Actions from '../actions/Actions'
import {List, Map} from 'immutable';

let counter = 0;

const initialState = Map({
    tasks: List([
        Map({
            ID: 0,
            text: 'Task Example',
            completed: false
        })
    ]),
    hideCompleted: true,
    order: 'creation'
});

export default (state = initialState, action) => {

    let index, TODO, newTODOsList;

    switch (action.type) {
        case Actions.Types.ADD_TODO:
            return state.set('tasks', state.get('tasks').push(Map({ID: ++counter, text: action.text, completed: false,})))

        case Actions.Types.EDIT_TODO:
            index = state.get('tasks').findIndex((task) => task.get('ID') === action.ID);
            TODO = state.get('tasks').get(index).set('text',action.text);
            newTODOsList = state.get('tasks').set(index,TODO);
            return state.set('tasks', newTODOsList);

        case Actions.Types.CHECK:
            index = state.get('tasks').findIndex((task) => task.get('ID') === action.ID);
            TODO = state.get('tasks').get(index).set('completed', !state.get('tasks').get(index).get('completed'));
            console.log("ESTADO ATUAL: ",state.get('tasks').get(index).get('completed'));
            newTODOsList = state.get('tasks').set(index,TODO);
            return state.set('tasks', newTODOsList);



        case Actions.Types.MARK_INCOMPLETE:
            const taskUnmarkIndex = state.findIndex((task) => task.get('id') === action.id);
            return state.setIn([taskUnmarkIndex, 'marked'], false);

        case Actions.Types.DELETE_TODO:
            index = state.get('tasks').findIndex((task) => task.get('ID') === action.ID);
            return state.set('tasks', state.get('tasks').delete(index));

        case Actions.VisibilityFilters.HIDE_COMPLETED:
            return state.set('hideCompleted', action.hide)

        case Actions.VisibilityFilters.ORDER:
            return state.set('order', action.order)

        default:
            return state;
    }
}
