import { combineReducers } from 'redux';
import { financesReducer } from './finances/reducer';

import * as ACTIONS from './actions';

const defaultState = {
    isLogin: false, // Идентификатор авторизации
    isBlock: false, // Идентификатор ограничения доступа
    user: {}, // Данные пользователя
};

export default combineReducers({
    finance: financesReducer,
    main: (state = defaultState, action) => {
        switch (action.type) {
            case ACTIONS.IS_LOGIN:
                return { ...state, isLogin: action.payload }
            case ACTIONS.IS_BLOCK:
                return { ...state, isBlock: action.payload }
            case ACTIONS.USER_DATA:
                return { ...state, user: action.payload }
            default:
                return state;
        }
    }
});