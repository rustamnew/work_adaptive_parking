import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

// plug-ins
import Moment from 'moment';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import Back from '../../Components/Back';

// models
import {Clients,Orders} from './../../Models';

// helpers
import {moneyFormat,phoneFormatter} from '../../Globals/Utils';

// globals
import { orderStatusName } from '../../Globals/Constants';

// styles
import './styles.css';

const OrderScreen = (props) => {
	const [id] = useState(props.match.params.id||0);
	const [order, setOrder] = useState(null);
	const [client, setClient] = useState(null);
	useEffect(() => {
		const orderGet = async () => {
			const d = await Orders.get(id);
			const order = d.data[0];
			const client = await Clients.get(order.clientId);
			setClient(client.data[0]);
			setOrder(order);
		};
		orderGet();
	}, [id]);
	return (
		<Template>
			{order === null ? <Loader /> :
				<div>
					<Back title={`Заказ №${order.id}`} link='orders' />
					<div className="form-container">
						<div className="cell">
							<label>
								<span>Дата создания</span>
								<div>{Moment(order.dateCreate*1000).format('DD.MM.y, H:mm')}</div>
							</label>
						</div>
						<div className="cell-oneline">
							<div className="cell">
								<label>
									<span>Имя</span>
									<div><Link to={`/client/${client.id}`}>{client.name}</Link></div>
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Телефон</span>
									<div>{phoneFormatter(client.phone)}</div>
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Эл.почта</span>
									<div>{client.email||'—'}</div>
								</label>
							</div>
						</div>
						<div className="cell-oneline">
							<div className="cell">
								<label>
									<span>Сумма</span>
									<div>{moneyFormat(order.amountFull)} ₽</div>
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Комиссия</span>
									<div>{moneyFormat(order.amount)} ₽</div>
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Процент комиссии</span>
									<div>{moneyFormat(order.comissionPercent)}</div>
								</label>
							</div>
						</div>
						<div className="cell">
							<label>
								<span>Парковка</span>
								<div><Link to={`/parking/${order.parkingId}`}>{order.parkingId}</Link></div>
							</label>
						</div>
						<div className="cell">
							<label>
								<span>Статус</span>
								<div>{orderStatusName[order.status]}</div>
							</label>
						</div>
					</div>
				</div>
			}
		</Template>
	);
};

export default OrderScreen;