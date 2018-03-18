//flow

/*
 * ActionTypes
 */
export const Types = {
    ADD_TODO: 'ADD',
    EDIT_TODO: 'EDIT',
    MARK_COMPLETE: 'MARK_COMPLETE',
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
export const add = (text: string) => ({ type: Types.ADD_TODO, text });
export const edit = (ID: number, text: string) => ({ type: Types.EDIT_TODO, ID, text });
export const complete = (ID: number) => ({ type: Types.MARK_COMPLETE, ID });
export const incomplete = (ID: number) => ({ type: Types.MARK_INCOMPLETE, ID });
export const del = (ID: number) => ({ type: Types.DELETE_TODO, ID });

export const hideCompleted = (value: boolean) => ({ type: VisibilityFilters.HIDE_COMPLETED, hide: value });
export const setOrder = (order: string) => ({ type: VisibilityFilters.ORDER, order });
