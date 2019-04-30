import {createStore, combineReducers} from 'redux';
import department from './reducers/department';

export default createStore(department, {});