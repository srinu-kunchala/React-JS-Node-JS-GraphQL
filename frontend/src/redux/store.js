import {createStore, combineReducers} from 'redux';
import department from './reducers/department';
import category from './reducers/category';
import products from './reducers/products';

export default createStore(combineReducers({department,category, products}), {});