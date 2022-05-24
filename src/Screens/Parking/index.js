import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

// plug-ins
import Moment from 'moment';
import {YMaps,Map,ZoomControl,Placemark} from 'react-yandex-maps';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import Back from '../../Components/Back';

// models
import {Parkings} from './../../Models';

// helpers
import {moneyFormat,phoneFormatter} from '../../Globals/Utils';

// globals
import {parkingStatusName,MAP} from '../../Globals/Constants';

// styles
import './styles.css';

const ParkingScreen = (props) => {
	const [id] = useState(props.match.params.id||0);
	const [parking, setParking] = useState(null);
	useEffect(() => {
		const parkingGet = async () => {
			const d = await Parkings.get(id);
			setParking(d.data[0]);
		};
		parkingGet();
	}, [id]);
	return (
		<Template>
			{parking === null ? <Loader /> :
				<div>
					<Back title={`Парковка №${parking.id}`} link='parkings' />
					<div className="form-container">
						<div className="cell">
							<label>
								<span>Дата создания</span>
								<div>{Moment(parking.dateCreate*1000).format('DD.MM.y, H:mm')}</div>
							</label>
						</div>
						<div className="cell">
							<label>
								<span>Адрес</span>
								<div>{parking.address}</div>
							</label>
						</div>
						<div className="cell-oneline">
							<div className="cell">
								<label>
									<span>Имя</span>
									<div><Link to={`/client/${parking.clientId}`}>{parking.clientName}</Link></div>
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Телефон</span>
									<div>{phoneFormatter(parking.clientPhone)}</div>
								</label>
							</div>
						</div>
						<div className="cell">
							<label>
								<span>Коментарий</span>
								<div>{parking.comment||'—'}</div>
							</label>
						</div>
						<div className="cell-oneline">
							<div className="cell">
								<label>
									<span>Сумма</span>
									<div>{moneyFormat(parking.amount)} ₽</div>
								</label>
							</div>
							<div className="cell">
								<label>
									<span>Статус</span>
									<div>{parkingStatusName[parking.status]}</div>
								</label>
							</div>
						</div>
					</div>
					<div className="map">
						<YMaps query={{apikey:MAP.keyYandex}}>
							<Map
								state={{center:[parking.latitude,parking.longitude],zoom:16}}
								width={'auto'} height={'100%'}>
									<Placemark geometry={[parking.latitude,parking.longitude]} />
									<ZoomControl />
								</Map>
						</YMaps>
					</div>
				</div>
			}
		</Template>
	);
};

export default ParkingScreen;