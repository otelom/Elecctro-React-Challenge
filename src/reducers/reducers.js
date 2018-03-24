import {List, Map} from 'immutable';
import {ActionTypes, VisibilityFilters, COMPLETE, INCOMPLETE, ZA} from '../constants/constants'

const initialState = Map({
    tasks: List([]),
    hideCompleted: true,
    order: 'creation'
});

function arrayToMap(list) {

    return List(list.map((todo) => {
            return Map({id: todo.id, text: todo.description, state: todo.state});
        }
    ));
}

export default (state = initialState, action) => {

    let index, TODO, newTODOsList;

    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return state.set('tasks', state.get('tasks').push(Map({
                id: action.id,
                text: action.text,
                state: action.state
            })));

        case ActionTypes.EDIT_TODO:
            index = state.get('tasks').findIndex((task) => task.get('id') === action.id);
            TODO = state.get('tasks').get(index).set('text', action.text);
            newTODOsList = state.get('tasks').set(index, TODO);
            return state.set('tasks', newTODOsList);

        case ActionTypes.MARK_COMPLETE:
            index = state.get('tasks').findIndex((task) => task.get('id') === action.id);
            TODO = state.get('tasks').get(index).set('state', COMPLETE);
            newTODOsList = state.get('tasks').set(index, TODO);
            return state.set('tasks', newTODOsList);

        case ActionTypes.MARK_INCOMPLETE:
            index = state.get('tasks').findIndex((task) => task.get('id') === action.id);
            TODO = state.get('tasks').get(index).set('state', INCOMPLETE);
            newTODOsList = state.get('tasks').set(index, TODO);
            return state.set('tasks', newTODOsList);

        case ActionTypes.DELETE_TODO:
            index = state.get('tasks').findIndex((task) => task.get('id') === action.id);
            return state.set('tasks', state.get('tasks').delete(index));

        case VisibilityFilters.ORDER: {
            if (action.order === ZA)
                return state.set('tasks', arrayToMap(action.list.reverse()));
            else
                return state.set('tasks', arrayToMap(action.list));
        }
        default:
            return state;
    }
}