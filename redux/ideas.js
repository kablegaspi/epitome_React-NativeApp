import * as ActionTypes from './ActionTypes';

export const ideas = (state = { isLoading: true,
                                        errMess: null,
                                        ideas: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_IDEAS:
            return {...state, isLoading: false, errMess: null, ideas: action.payload};

        case ActionTypes.IDEAS_LOADING:
            return {...state, isLoading: true, errMess: null, ideas: []}

        case ActionTypes.IDEAS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};