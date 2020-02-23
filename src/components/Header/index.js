import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
	return (
		<Container>
			<Content>
				<nav>
					<img src={logo} alt="GoBarber" height="30" />
					<Link to="/dashboard">DASHBOARD</Link>
				</nav>

				<aside>
					<Profile>
						<div>
							<strong>Julio Martins</strong>
							<Link to="/profile">Meu perfil</Link>
						</div>
						<img
							src="https://api.adorable.io/avatars/50/abott@adorable.png"
							alt="Julio Martins"
						/>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
