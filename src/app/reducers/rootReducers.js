import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';

const rootReducer = combineReducers({
	form: FormReducer,
	events: eventReducer,
	modals: modalReducer,
	auth: authReducer,
	async: asyncReducer,
	toastr: ToastrReducer
});

export default rootReducer;
