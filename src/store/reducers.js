import * as types from "./constants.js"

const initialCredential = {
    email: '',
    password: '',
};

export function user(state = null, action) {
    if (action.type == types.SET_USER) {
        //console.log("reducer", action);
        return action.payload;
    }

    return state;
}

export function pubnub(state = null, action) {
    if (action.type == types.SET_PUBNUB) {
        //console.log("reducer", action);
        return action.payload;
    }

    return state;
}

export function credential(state = initialCredential, action) {
    if (action.type == types.SET_CREDENTIAL) {
        return action.payload;
    }

    return state;
}

export function splash(state = true, action) {
    if (action.type == types.SET_SPLASH) {
        return action.payload;
    }

    return state;
}

export function team(state = null, action) {
    if (action.type == types.SET_TEAM) {
        return action.payload;
    }

    return state;
}

export function teams(state = {}, action) {
    if (action.type == types.SET_TEAM_LIST) {
        return action.payload;
    }

    return state;
}

export function counter(state = 0, action) {
    if (action.type == types.SET_COUNTER) {
        return action.payload;
    }

    return state;
}