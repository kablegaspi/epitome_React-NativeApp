import * as ActionTypes from './ActionTypes';

export const proposals = (state = { isLoading: true,
                                     errMess: null,
                                     proposals: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROPOSALS:
            return {...state, isLoading: false, errMess: null, proposals: action.payload};

        case ActionTypes.PROPOSALS_LOADING = 'PROPOSALS_LOADING':
            return {...state, isLoading: true, errMess: null, proposals: []}

        case ActionTypes.PROPOSALS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};