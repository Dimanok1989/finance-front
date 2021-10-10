import * as ACTIONS from './actions';

const defaultState = {
    open: false,
};

export const financesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.SET_OPEN:
            return { ...state, open: action.payload }
        default:
            return state;
    }
}