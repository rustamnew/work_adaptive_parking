import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import DataGrid,{dgDataPrepare} from '../../Components/DataGrid';
import NotFound from '../../Components/NotFound';

// models
import {Clients} from './../../Models';

// helpers
import {empty} from '../../Globals/Utils';

// globals
import {clientStatus,clientStatusName} from '../../Globals/Constants';

const ClientsScreen = () => {
	const [clients, setClients] = useState(null);
	const [dataFull, setDataFull] = useState(null);
	const [status, setStatus] = useState(clientStatus.IN_ACTIVE);
	useEffect(() => {
		const clientsGet = async () => {
			const d = await Clients.getAll();
			setClients(dataSet(d.data));
			setDataFull(d.data);
		};
		clientsGet();
	}, []);
	const dataSet = (data) => dgDataPrepare(data, 'clients', ['id','phone','name','status','dateCreate']);
	const dataSearch = (data, search) => data.filter(f => (f.name && f.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) || (f.phone && f.phone.toLowerCase().indexOf(search.toLowerCase()) !== -1));
	const dataStatus = (data, status) => data.filter(f => f.status === status);
	const handleSearch = (e) => {
		const search = e.target.value;
		let d = dataFull;
		if (search.length > 1) d = dataSearch(d, search);
		if (status !== null) d = dataStatus(d, status);
		setClients(dataSet(d));
	}
	const handleStatus = (e) => {
		let status = e.target.value;
		let d = dataFull;
		if (empty(status)) status = null;
		if (status !== null) d = dataStatus(d, parseInt(status));
		setClients(dataSet(d));
		setStatus(status);
	}
	return (
		<Template>
			{clients === null ? <Loader /> :
				<DataGrid
					title={'Клиенты'} 
					keys={['ID','Телефон','Имя','Статус','Дата регистрации']}
					link={'client'}
					data={clients}
					dataFull={dataFull}
					controlPanel={<>
						<div>
							<input type="search" placeholder="Поиск" onChange={handleSearch} />
						</div>
						<div>
							<span>Статус</span>
							<select onChange={handleStatus}>
								<option value=" ">все</option>
								{clientStatusName.map((v,i) => <option key={i} value={i}>{v}</option>)}
							</select>
						</div>
					</>}
					notFound={<NotFound />} />
			}
		</Template>
	);
};

export default ClientsScreen;