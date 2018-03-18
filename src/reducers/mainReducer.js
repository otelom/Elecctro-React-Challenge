import { combineReducers } from 'redux';
import reducer from './reducers';

const rootReducer = combineReducers({
    tasks: reducer
});

export default rootReducer;