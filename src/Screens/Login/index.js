import React, {useState} from 'react';

// models
import {Users} from './../../Models';

// helpers
import {ls} from '../../Globals/Localstorage';
import {empty} from '../../Globals/Utils';

// logo
import logo from '../../Images/inparking.logo.svg';

// styles
import './styles.css';

const LoginScreen = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const next = async () => {
		clear();
		if (empty(username)) {
			setUsernameError(true);
			return;
		}
		if (empty(password)) {
			setPasswordError(true);
			return;
		}
		const res = await Users.login(username, password);
		if (res.code !== 0 || res.data === null) return error();
		ls('user', res.data);
		window.location.href='/';
	}
	const clear = () => {
		setUsernameError(false);
		setPasswordError(false);
	}
	const error = () => {
		setUsernameError(true);
		setPasswordError(true);
	}
	const handleUsername = (e) => setUsername(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	return (
		<div className="login-container">
			<img src={logo} alt="InParking" />
			<div className="form-column">
				<label>
					<input type="text" placeholder=" " iserror={`${usernameError!==undefined&&usernameError}`} value={username} onChange={handleUsername} className="input-panel" maxLength={20} />
					<span className="placeholder">Имя пользователя</span>
				</label>
			</div>
			<div className="form-column">
				<label>
					<input type="password" placeholder=" " iserror={`${passwordError!==undefined&&passwordError}`} value={password} onChange={handlePassword} className="input-panel" maxLength={20} />
					<span className="placeholder">Пароль</span>
				</label>
			</div>
			<button onClick={next} className="btn">Войти</button>
		</div>
	);
}

export default LoginScreen;