import * as ActionTypes from './ActionTypes';

export const finals = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_FINAL:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);
        case ActionTypes.DELETE_FINAL:
                return state.filter(final => final !== action.payload);
        default:
            return state;
    }
};