import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import Back from '../../Components/Back';
import Alert,{alertShow} from '../../Components/Alert';
import {useInput} from '../../Components/Hooks/Input';

// models
import {Clients} from './../../Models';

// helpers
import {empty,phoneNormalize} from '../../Globals/Utils';

// globals
import {clientStatus,clientStatusName} from '../../Globals/Constants';

// styles
import './styles.css';

const ClientScreen = (props) => {
	const [id] = useState(props.match.params.id||0);
	const [status, setStatus] = useState(clientStatus.IN_ACTIVE);
	const [description, setDescription] = useState('');
	const [client, setClient] = useState(null);
	const {value:name, setValue:setName, bind:bindName} = useInput('');
	const {value:phone, setValue:setPhone, bind:bindPhone} = useInput('');
	const {value:email, setValue:setEmail, bind:bindEmail} = useInput('');
	const {value:username, setValue:setUsername, bind:bindUsername} = useInput('');
	const {value:password, bind:bindPassword} = useInput('');
	useEffect(() => {
		const clientGet = async () => {
			const d = await Clients.get(id);
			const client = d.data[0];
			setClient(client);
			setName(client.name);
			setPhone(client.phone);
			setEmail(client.email);
			setUsername(client.username);
			setDescription(client.description);
			setStatus(client.status);
		};
		clientGet();
	}, [id,setName,setEmail,setPhone,setUsername,setDescription,setStatus]);
	const selectHandle = (e) => setStatus(parseInt(e.target.value));
	const textareaHandle = (e) => setDescription(e.target.value);
	const save = (e) => {
		e.preventDefault();
		const data = {name,phone:phoneNormalize(phone),email,username,status};
		if (!empty(password)) data.password = password;
		if (!empty(description)) data.description = description;
		if (data.status === clientStatus.ACTIVE) data.description = '';
		Clients.update(id, data, () => alertShow('Операция прошла успешно!'), (err) => alertShow('<b>Ошибка!</b><br/>При сохранении данных возникла ошибка', true));
	}
	return (
		<Template>
			{client === null ? <Loader /> :
				<form onSubmit={save}>
					<Back title="Редактирование клиента" link='clients' />
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
									<span>Телефон</span>
									<input type="tel" {...bindPhone} placeholder="Телефон" disabled={true} required />
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Адрес эл.почты</span>
									<input type="email" {...bindEmail} placeholder="Адрес эл.почты" />
								</label>
							</div>
						</div>
						<div className="cell">
							<label>
								<span>Статус</span>
								<select className="select-minimal" onChange={selectHandle} value={status}>
									{clientStatusName.map((v,i) => <option key={i} value={i}>{v}</option>)}
								</select>
							</label>
						</div>
						{status === clientStatus.BAN || status === clientStatus.DELETE ?
							<>
								<div className="notice">
									<span>Внимание! Вы выбрали статус клиента <b>{clientStatusName[status]}</b>. Необходимо указать причину смены статуса</span>
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

export default ClientScreen;