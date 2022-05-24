import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import DataGrid,{dgDataPrepare} from '../../Components/DataGrid';
import NotFound from '../../Components/NotFound';

// models
import {Parkings} from './../../Models';

// helpers
import {empty} from '../../Globals/Utils';

// globals
import {parkingStatus,parkingStatusName} from '../../Globals/Constants';

const ParkingsScreen = () => {
	const [parkings, setOrders] = useState(null);
	const [dataFull, setDataFull] = useState(null);
	const [status, setStatus] = useState(parkingStatus.IN_ACTIVE);
	useEffect(() => {
		const ordersGet = async () => {
			const d = await Parkings.getAll();
			setOrders(dataSet(d.data));
			setDataFull(d.data);
		};
		ordersGet();
	}, []);
	const dataSet = (data) => dgDataPrepare(data, 'parkings', ['id','clientName','address','amount','status','dateCreate']);
	const dataStatus = (data, status) => data.filter(f => f.status === status);
	const handleStatus = (e) => {
		let status = e.target.value;
		let d = dataFull;
		if (empty(status)) status = null;
		if (status !== null) d = dataStatus(d, parseInt(status));
		setOrders(dataSet(d));
		setStatus(status);
	}
	return (
		<Template>
			{parkings === null ? <Loader /> :
				<DataGrid
					title={'Парковки'} 
					keys={['ID','Клиент','Адрес','Сумма, ₽','Статус','Дата']}
					link={'parking'}
					data={parkings}
					dataFull={dataFull}
					controlPanel={<>
						<div></div>
						<div>
							<span>Статус</span>
							<select onChange={handleStatus}>
								<option value=" ">все</option>
								{parkingStatusName.map((v,i) => <option key={i} value={i}>{v}</option>)}
							</select>
						</div>
					</>}
					notFound={<NotFound />} />
			}
		</Template>
	);
};

export default ParkingsScreen;