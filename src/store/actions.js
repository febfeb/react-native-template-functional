import * as types from "./constants"

export const setUser = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_USER,
        payload,
    });
};

export const setPubnub = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_PUBNUB,
        payload,
    });
};

export const setCredential = (payload) => (dispatch) => {
    dispatch({ type: types.SET_CREDENTIAL, payload });
};

export const setSplash = (payload) => (dispatch) => {
    dispatch({ type: types.SET_SPLASH, payload });
};

export const setTeam = (payload) => (dispatch) => {
    dispatch({ type: types.SET_TEAM, payload });
};

export const setTeamList = (payload) => (dispatch) => {
    dispatch({ type: types.SET_TEAM_LIST, payload });
};

export const setCounter = (payload) => (dispatch) => {
    dispatch({ type: types.SET_COUNTER, payload });
};