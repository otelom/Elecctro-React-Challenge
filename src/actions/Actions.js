//flow

import fetch from 'cross-fetch'
import {ActionTypes, VisibilityFilters, COMPLETE, INCOMPLETE, ALL, DATE_ADDED} from '../constants/constants';

/*
 * Action Creators
 */
export const added = (id: string, text: string, state: string) => ({type: ActionTypes.ADD_TODO, id, text, state});
export const edited = (id: string, text: string, state: string) => ({type: ActionTypes.EDIT_TODO, id, text, state});
export const checked = (id: string, text: string, state: string) => ({
    type: ActionTypes.MARK_COMPLETE,
    id,
    text,
    state
});
export const unchecked = (id: string, text: string, state: string) => ({
    type: ActionTypes.MARK_INCOMPLETE,
    id,
    text,
    state
});
export const deleted = (id: string) => ({type: ActionTypes.DELETE_TODO, id});
export const listObtained = (list: Array<{ id: string, text: string, state: string }>, order: string) => ({
    type: VisibilityFilters.ORDER,
    list,
    order
});

export const add = (text: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos', {
            method: "PUT",
            body: JSON.stringify({
                description: text
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status >= 400) {
                console.log("Unexpected message from server: ", response);
                return;
            }
            response.json().then(todo => dispatch(added(todo.id, todo.description, todo.state)));
        });
    }
};

export const edit = (id: string, text: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos/' + id, {
            method: "PATCH",
            body: JSON.stringify({
                description: text
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status >= 400) {
                console.log("Unexpected message from server: ", response);
                return;
            }
            response.json().then(todo => dispatch(edited(todo.id, todo.description, todo.state)));
        });
    }
};

export const check = (id: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos/' + id, {
            method: "PATCH",
            body: JSON.stringify({
                state: COMPLETE
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status >= 400) {
                console.log("Unexpected message from server: ", response);
                return;
            }

            response.json().then(todo => {
                console.log("resposta: ", todo, "todo.state ", todo.state);
                return dispatch(checked(todo.id, todo.description, todo.state))
            });
        });
    }
};

export const uncheck = (id: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos/' + id, {
            method: "PATCH",
            body: JSON.stringify({
                state: INCOMPLETE
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status >= 400) {
                console.log("Unexpected message from server: ", response);
                return;
            }
            response.json().then(todo => dispatch(unchecked(todo.id, todo.description, todo.state)));
        });
    }
};

export const del = (id: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos/' + id, {
            method: "DELETE",
        }).then(response => {
            if (response.status >= 400) {
                console.log("Unexpected message from server: ", response);
                return;
            }
            dispatch(deleted(id));
        });
    }
};

export const getList = (orderBy: string = DATE_ADDED, filter: string = ALL, order: string = '') => {
    return dispatch => {
        fetch('http://localhost:8000/todos?orderBy=' + orderBy + '&filter=' + filter, {
            method: "GET",
        }).then(response => {
            if (response.status >= 400) {
                console.log("Unexpected message from server: ", response);
                return;
            }
            response.json().then(todosList => dispatch(listObtained(todosList, order)));
        });
    }
};