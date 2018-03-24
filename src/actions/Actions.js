//flow

import fetch from 'cross-fetch'

/*
 * ActionTypes
 */
export const Types = {
    ADD_TODO: 'ADD',
    EDIT_TODO: 'EDIT',
    CHECK: 'CHECK',
    MARK_INCOMPLETE: 'MARK_INCOMPLETE',
    DELETE_TODO: 'DELETE'
}

/*
 * Other Constants
 */
export const VisibilityFilters = {
    HIDE_COMPLETED: 'HIDE_COMPLETED',
    ORDER: 'ORDER'
}

/*
 * Action Creators
 */
// PASSAR PARA PASSADO VISTO QUE ESTAS  ACLÕES VÃO PASSAR A SER EXECUTADAS DEPOIS DAS QUE CHAMAM A API
export const added = (id: string, text: string, state: string) => ({ type: Types.ADD_TODO, id, text, state });
export const edited = (id: string, text: string, state: string) => ({ type: Types.EDIT_TODO, id, text, state });
export const checked = (id: string, text: string, state: string) => ({ type: Types.CHECK, id, text, state });
export const unchecked = (id: string, text: string, state: string) => ({ type: Types.MARK_INCOMPLETE, id, text, state });
export const deleted = (id: string) => ({ type: Types.DELETE_TODO, id});

export const hideCompleted = (list: Array<{id: string, text: string, state: string}>) => ({ type: VisibilityFilters.HIDE_COMPLETED, list});
export const listObtained = (list: Array<{id: string, text: string, state: string}>, order: string) => ({ type: VisibilityFilters.ORDER, list, order});
// ATÉ AQUI - AGORA DAQUI PARA BAIXO É API

const COMPLETE = "COMPLETE";
const INCOMPLETE = "INCOMPLETE";
const ALL = "ALL";
const AZ = "AZ";
const ZA = "ZA";
const DATE_ADDED = "DATE_ADDED";

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
            if (response.status >= 400){
                console.log("Unexpected message from server: ",response);
            }
            response.json().then(todo => dispatch(added(todo.id, todo.description, todo.state)));
        });
    }
};

export const edit = (id: string, text: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos/'+id,{
            method: "PATCH",
            body: JSON.stringify({
                description: text
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status >= 400){
                console.log("Unexpected message from server: ",response);
            }
            response.json().then(todo => dispatch(edited(todo.id, todo.description, todo.state)));
        });
    }
};

export const check = (id: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos/'+id,{
            method: "PATCH",
            body: JSON.stringify({
                state: COMPLETE
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status >= 400){
                console.log("Unexpected message from server: ",response);
            }

            response.json().then(todo => {console.log("resposta: ",todo,"todo.state ",todo.state); return dispatch(checked(todo.id, todo.description, todo.state))});
        });
    }
};

export const uncheck = (id: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos/'+id,{
            method: "PATCH",
            body: JSON.stringify({
                state: INCOMPLETE
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            if (response.status >= 400){
                console.log("Unexpected message from server: ",response);
            }
            response.json().then(todo => dispatch(unchecked(todo.id, todo.description, todo.state)));
        });
    }
};

export const del = (id: string) => {
    return dispatch => {
        fetch('http://localhost:8000/todos/'+id,{
            method: "DELETE",
        }).then(response => {
            if (response.status >= 400){
                console.log("Unexpected message from server: ",response);
            }
            dispatch(deleted(id));
        });
    }
};

export const getList = (orderBy: string = DATE_ADDED, filter: string = ALL, order: string = '') => {
    console.log("action creator recebeu hetList com ", orderBy, filter, order);
    return dispatch => {
        fetch('http://localhost:8000/todos?orderBy='+orderBy+'&filter='+filter,{
            method: "GET",
        }).then(response => {
            if (response.status >= 400){
                console.log("Unexpected message from server: ",response);
            }
            response.json().then(todosList => dispatch(listObtained(todosList, order)));
        });
    }
};