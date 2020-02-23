import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import Types from './actionTypes';
import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
	try {
		const { email, password } = payload;

		const response = yield call(api.post, 'sessions', {
			email,
			password,
		});

		const { token, user } = response.data;

		if (!user.provider) {
			toast.error('Usuário não é prestador');
			return;
		}

		yield put(signInSuccess(token, user));
		history.push('/dashboard');
	} catch (error) {
		toast.error('Falha na autenticação. Verifique seus dados');
		yield put(signFailure());
	}
}

export default all([takeLatest(Types.SIGN_IN_REQUEST, signIn)]);
