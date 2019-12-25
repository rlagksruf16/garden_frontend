import { combineReducers } from 'redux'

const users = (state = [], action) => {
    switch (action.type) {
        case 'USER_ADD':
            return [
                ...state,
                {
                    name: action.name,
                }
            ];
        default:
            return state
    }
};

export default combineReducers({
    users,
});