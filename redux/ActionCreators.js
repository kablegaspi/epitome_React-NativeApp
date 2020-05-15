import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchProposals = () => dispatch => {

    dispatch(proposalsLoading());

    return fetch(baseUrl + 'proposals')
        .then(response => {
                if (response.ok) {
                return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(proposals => dispatch(addProposals(proposals)))
        .catch(error => dispatch(proposalsFailed(error.message)));
};

export const proposalsLoading = () => ({
    type: ActionTypes.PROPOSALS_LOADING
});

export const proposalsFailed = errMess => ({
    type: ActionTypes.PROPOSALS_FAILED,
    payload: errMess
});

export const addProposals = proposals => ({
    type: ActionTypes.ADD_PROPOSALS,
    payload: proposals
});

export const fetchIdeas = () => dispatch => {
    
    dispatch(ideasLoading());

    return fetch(baseUrl + 'ideas')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(ideas => dispatch(addIdeas(ideas)))
        .catch(error => dispatch(ideasFailed(error.message)));
};

export const ideasLoading = () => ({
    type: ActionTypes.IDEAS_LOADING
});

export const ideasFailed = errMess => ({
    type: ActionTypes.IDEAS_FAILED,
    payload: errMess
});

export const addIdeas = ideas => ({
    type: ActionTypes.ADD_IDEAS,
    payload: ideas
});

export const fetchPartners = () => dispatch => {
    
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

export const postFinal = proposalId => dispatch => {
    setTimeout(() => {
        dispatch(addFinal(proposalId));
    }, 2000);
};

export const addFinal = proposalId => ({
    type: ActionTypes.ADD_FINAL,
    payload: proposalId
});

export const postComment = (proposalId, rating, author, text) => dispatch => {
    
    const newComment = {
        proposalId,
        rating,
        author,
        text
    };
    newComment.date = new Date().toISOString();
    setTimeout(() => dispatch(addComment(newComment)), 2000)

    };

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const deleteFinal = proposalId => ({
    type: ActionTypes.DELETE_FINAL,
    payload: proposalId
}); 
