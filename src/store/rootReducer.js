import {combineReducers} from 'redux';
import { movieReducer } from './reducers/MovieReducer';

const allReducers = {
    movie: movieReducer,
};

export const rootReducer = combineReducers(allReducers);