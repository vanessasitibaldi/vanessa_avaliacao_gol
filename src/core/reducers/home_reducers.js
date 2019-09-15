import * as types from '../actions/types';

export default function( state = {}, action ){
    switch (action.type) {
        case types.RECEIVED_HOME:
            return action.payload
        default:
            return state;
    }
}