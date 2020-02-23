import produce from 'immer';
import Types from './actionTypes';

const INITIAL_STATE = {
	token: null,
	signed: false,
	loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
	switch (action.type) {
		case Types.SIGN_IN_SUCCESS:
			return produce(state, draft => {
				draft.token = action.payload.token;
				draft.signed = true;
			});
		default:
			return state;
	}
}
