import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Alert,{alertShow} from '../../Components/Alert';

// models
import {Clients,Pushes} from './../../Models';

// helpers
import {empty} from '../../Globals/Utils';

// styles
import './styles.css';

const PushScreen = () => {
	const [title, setTitle] = useState('Сервис InParking');
	const [subtitle, setSubtitle] = useState('');
	const [message, setMessage] = useState('');
	const [clients, setClients] = useState('');
	useEffect(() => {
		const pushGet = async () => {
			const d = await Clients.getAll();
			setClients(d.data);
		};
		pushGet();
	}, []);
	const titleHandle = (e) => setTitle(e.target.value);
	const subtitleHandle = (e) => setSubtitle(e.target.value);
	const messageHandle = (e) => setMessage(e.target.value);
	const save = (e) => {
		e.preventDefault();
		if (empty(title) || empty(message)) return;
		Pushes.addAll(title, subtitle||'', message);
		alertShow('<b>Операция прошла успешно!</b><br>Пуш-сообщение отправлено адресатам');
	}
	const messageGet = (text,len) => <>{text.slice(0,len)}{text.length>len?`${'\u2026'}`:null}</>
	return (
		<Template>
			<h4 className="back-title">Отправить пуш</h4>
			<form onSubmit={save}>
				<div className="form-container">
					<div className="cell">
						<label>
							<span>Заголовок</span>
							<input type="text" name="title" placeholder="Напишите заголовок" value={title} onChange={titleHandle} required />
						</label>
					</div>
					<div className="cell">
						<label>
							<span>Подзаголовок (не обязательно)</span>
							<input type="text" name="title" placeholder="Напишите подзаголовок" value={subtitle} onChange={subtitleHandle} />
						</label>
					</div>
					<div className="cell">
						<label>
							<span>Сообщение</span>
							<textarea name="message" placeholder="Напишите сообщение" className="desc" value={message} onChange={messageHandle} required></textarea>
						</label>
					</div>
					<h4>Пример сообщения</h4>
					<div className="examples">
						<div className="examples-ios">
							<div className="examples-header"><span></span>InParking</div>
							<div className="examples-title">{messageGet(title,45)}</div>
							<div className="examples-subtitle">{messageGet(subtitle,45)}</div>
							<div className="examples-text">{messageGet(message,158)}</div>
						</div>
						<div className="examples-android">
							<div className="examples-header"><span></span>InParking</div>
							<div className="examples-title">{messageGet(title,45)}</div>
							<div className="examples-text">{messageGet(message,43)}</div>
						</div>
					</div>
					<div className="buttons">
						<button type="submit">Отправить</button>
					</div>
				</div>
			</form>
			<Alert />
		</Template>
	);
};

export default PushScreen;