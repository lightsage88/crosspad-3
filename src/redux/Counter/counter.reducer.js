import { INCREMENT_COUNT, DECREMENT_COUNT } from './counter.types.js';

const INITIAL_STATE = {
    count: 0
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DECREMENT_COUNT:
            return Object.assign({}, state, {
                count: state.count - 1
            });
        case INCREMENT_COUNT:
            return Object.assign({}, state, {
                count: state.count + 1
            });
        default: return state;
    }
};

export default reducer;