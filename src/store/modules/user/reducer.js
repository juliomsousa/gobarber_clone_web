import produce from 'immer';
import AuthTypes from '../auth/actionTypes';

const INITIAL_STATE = {
	profile: null,
};

export default function user(state = INITIAL_STATE, action) {
	switch (action.type) {
		case AuthTypes.SIGN_IN_SUCCESS:
			return produce(state, draft => {
				draft.profile = action.payload.user;
			});
		default:
			return state;
	}
}
