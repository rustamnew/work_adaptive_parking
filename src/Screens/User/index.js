import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import Back from '../../Components/Back';
import Alert,{alertShow} from '../../Components/Alert';
import {useInput} from '../../Components/Hooks/Input';

// models
import {Users} from './../../Models';

// helpers
import {empty,phoneNormalize} from '../../Globals/Utils';

// globals
import {userStatus,userStatusName} from '../../Globals/Constants';

// styles
import './styles.css';

const UserScreen = (props) => {
	const [id] = useState(props.match.params.id||0);
	const [status, setStatus] = useState(userStatus.IN_ACTIVE);
	const [description, setDescription] = useState('');
	const [user, setUser] = useState(null);
	const {value:name, setValue:setName, bind:bindName} = useInput('');
	const {value:phone, setValue:setPhone, bind:bindPhone} = useInput('');
	const {value:email, setValue:setEmail, bind:bindEmail} = useInput('');
	const {value:username, setValue:setUsername, bind:bindUsername} = useInput('');
	const {value:password, bind:bindPassword} = useInput('');
	useEffect(() => {
		const userGet = async () => {
			const d = await Users.get(id);
			const user = d.data[0];
			setUser(user);
			setName(user.name);
			setPhone(user.phone);
			setUsername(user.username);
			setDescription(user.description);
			setStatus(user.status);
		};
		userGet();
	}, [id,setName,setPhone,setUsername,setEmail,setDescription,setStatus]);
	const selectHandle = (e) => setStatus(parseInt(e.target.value));
	const textareaHandle = (e) => setDescription(e.target.value);
	const save = (e) => {
		e.preventDefault();
		const data = {name,phone:phoneNormalize(phone),email,username,status};
		if (!empty(password)) data.password = password;
		if (!empty(description)) data.description = description;
		if (data.status === userStatus.ACTIVE) data.description = '';
		Users.update(id, data, () => alertShow('Операция прошла успешно!'), (err) => alertShow('<b>Ошибка!</b><br/>При сохранении данных возникла ошибка', true));
	}
	return (
		<Template>
			{user === null ? <Loader /> :
				<form onSubmit={save}>
					<Back title="Редактирование пользователя" link='users' />
					<div className="form-container">
						<div className="cell">
							<label>
								<span>Имя</span>
								<input type="text" {...bindName} placeholder="Имя" required />
							</label>
						</div>
						<div className="cell-oneline">
							<div className="cell">
								<label>
									<span>Имя пользователя</span>
									<input type="text" {...bindUsername} placeholder="Имя пользователя" required />
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Пароль</span>
									<input type="password" {...bindPassword} placeholder="Пароль" />
								</label>
							</div>
						</div>
						<div className="cell-oneline">
							<div className="cell">
								<label>
									<span>Телефон</span>
									<input type="tel" {...bindPhone} placeholder="Телефон" disabled={true} required />
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Адрес эл.почты</span>
									<input type="email" {...bindEmail} placeholder="Адрес эл.почты" required />
								</label>
							</div>
						</div>
						<div className="cell">
							<label>
								<span>Статус</span>
								<select className="select-minimal" onChange={selectHandle} value={status}>
									{userStatusName.map((v,i) => <option key={i} value={i}>{v}</option>)}
								</select>
							</label>
						</div>
						{status === userStatus.BAN || status === userStatus.DELETE ?
							<>
								<div className="notice">
									<span>Внимание! Вы выбрали статус клиента <b>{userStatusName[status]}</b>. Необходимо указать причину смены статуса</span>
								</div>
								<div className="cell">
									<label>
										<span>Описание блокировки</span>
										<textarea placeholder="Опишите причину блокировки оператора" className="desc" value={description} onChange={textareaHandle} required></textarea>
									</label>
								</div>
							</>
						: null}
						<div className="buttons">
							<button type="submit">Сохранить</button>
						</div>
					</div>
				</form>
			}
			<Alert />
		</Template>
	);
};

export default UserScreen;