import * as ACTIONS from './actions';

const defaultState = {
    open: false,
    data: [],
    pagination: {
        current: 1,
        pageSize: 10,
    },
};

const mapData = data => {
    return data.map(row => ({
        ...row,
        key: row.id,
    }));
}

export const financesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.SET_OPEN:
            return { ...state, open: action.payload }
        case ACTIONS.SET_DATA:
            return { ...state, data: mapData(action.payload) }
        case ACTIONS.CREATED_ROW:
            return { ...state, data: mapData([action.payload, ...state.data].slice(0, state.pagination.pageSize)) }
        case ACTIONS.SET_PAGINATION:
            return { ...state, pagination: action.payload }
        default:
            return state;
    }
}