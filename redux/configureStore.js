import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { proposals } from './proposals';
import { comments } from './comments';
import { ideas } from './ideas';
import { partners } from './partners';
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
    key: 'root',
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            proposals,
            comments,
            partners,
            ideas,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);
  
  
    return { persistor, store };
};