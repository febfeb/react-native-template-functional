import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user, pubnub, credential, splash, team, teams, counter } from './reducers';

const config = {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['user', 'credential', 'counter'],
};

const store = createStore(
    persistCombineReducers(config, { user, pubnub, credential, splash, team, teams, counter }),
    undefined,
    compose(applyMiddleware(thunk)),
);

export { store };