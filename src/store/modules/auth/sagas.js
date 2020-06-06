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

		api.defaults.headers.Authorization = `Bearer ${token}`;

		yield put(signInSuccess(token, user));
		history.push('/dashboard');
	} catch (error) {
		toast.error('Falha na autenticação. Verifique seus dados');
		yield put(signFailure());
	}
}

export function* signUp({ payload }) {
	try {
		const { name, email, password } = payload;

		yield call(api.post, 'users', {
			name,
			email,
			password,
			provider: true,
		});

		history.push('/');
	} catch (error) {
		toast.error('Falha no cadastro. Verifique seus dados');
		yield put(signFailure());
	}
}

export function setToken({ payload }) {
	if (!payload) return;

	const { token } = payload.auth;

	if (token) {
		api.defaults.headers.Authorization = `Bearer ${token}`;
	}
}

export function signOut() {
	history.push('/');
}

export default all([
	takeLatest('persist/REHYDRATE', setToken),
	takeLatest(Types.SIGN_IN_REQUEST, signIn),
	takeLatest(Types.SIGN_UP_REQUEST, signUp),
	takeLatest(Types.SIGN_OUT, signOut),
]);
