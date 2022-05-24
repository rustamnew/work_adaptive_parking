import React, {useEffect,useState} from 'react';

// plug-ins
import Moment from 'moment';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import Back from '../../Components/Back';

// models
import {Pushes,Supports} from './../../Models';

// helpers
import {ls} from '../../Globals/Localstorage';
import { empty } from '../../Globals/Utils';

// globals
import {mediaType, messageStatus} from '../../Globals/Constants';

// styles
import './styles.css';

const SupportScreen = (props) => {
	const [id] = useState(props.match.params.id||0);
	const [message, setMessage] = useState('');
	const [support, setSupport] = useState(null);
	useEffect(() => {
		const supportGet = async () => {
			const d = await Supports.get(id);
			const data = await Supports.getByClient(d.data[0].clientId)
			setSupport(data.data);
		};
		supportGet();
		const interval = setInterval(() => supportGet(), 5000);
		return () => clearInterval(interval);
	}, [id]);
	const messageHandle = (e) => setMessage(e.target.value);
	const save = (e) => {
		e.preventDefault();
		if (empty(message)) return;
		const user = ls('user');
		const clientId = support[0].clientId, clientName = support[0].clientName;
		const data = {
			clientId,
			clientName,
			userId:user.id,
			userName:user.name,
			message,
			statusClient:messageStatus.UNKNOWN,
			statusUser:messageStatus.READED,
			type:mediaType.TEXT
		};
		Supports.add(data);
		data.dateCreate = Math.ceil(new Date().getTime()/1000);
		support.unshift(data);
		Pushes.add('Сообщение от поддержки', '', message.slice(0, 158), clientId, {type:'SUPPORT'});
		setSupport(support);
		setMessage('');
	}
	return (
		<Template>
			{support === null ? <Loader /> :
				<>
					<Back title="Обращение пользователя" link='supports' />
					<form onSubmit={save}>
						<div className="form-container">
							<div className="cell">
								<label>
									<span>Клиент</span>
									<div><b>{support[0].clientName}</b></div>
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Сообщение</span>
									<textarea name="message" placeholder="Напишите сообщение" value={message} onChange={messageHandle} required></textarea>
								</label>
							</div>
							<div className='messages'>
								{support.map((v,i) => <div key={i} className="message">
									<div className="date">{Moment(v.dateCreate*1000).format('DD.MM.y, H:mm')}</div>
									{v.type === 2 ? <a href={v.message} target="_blank" rel="noreferrer"><img src={v.message} alt="" /></a> : v.message}
								</div>)}
							</div>
							<div className="buttons">
								<button type="submit">Отправить</button>
							</div>
						</div>
					</form>
				</>
			}
		</Template>
	);
};

export default SupportScreen;