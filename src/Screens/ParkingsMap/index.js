import React, {useEffect,useState} from 'react';

// plug-ins
import {YMaps,Map,ZoomControl,Placemark} from 'react-yandex-maps';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';

// models
import {Parkings} from './../../Models';

// globals
import {MAP} from '../../Globals/Constants';

// styles
import './styles.css';

const ParkingsMapScreen = () => {
	const [parkings, setParkings] = useState(null);
	useEffect(() => {
		const parkingsGet = async () => {
			const d = await Parkings.getActive();
			setParkings(d.data);
		};
		parkingsGet();
	}, []);
	return (
		<Template>
			{parkings === null ? <Loader /> :
				<>
					<div className="map-container">
						<h4>Парковки на карте</h4>
					</div>
					<div className="map-large">
						<YMaps query={{apikey:MAP.keyYandex}}>
							<Map
								state={{center:MAP.defaultCoordinates,zoom:12}}
								width={'auto'} height={'100%'}>
									<ZoomControl />
									{parkings.map((v,i) => <Placemark
										key={i}
										geometry={[v.latitude,v.longitude]}
										properties={{balloonContent:`<a href="/parking/${v.id}"><b>Заказ №${v.id}</b></a><div>${v.address}</div>`,hintContent:v.address}}
										modules={['geoObject.addon.hint','geoObject.addon.balloon']} />
									)}
								</Map>
							</YMaps>
					</div>
				</>
			}
		</Template>
	);
};

export default ParkingsMapScreen;