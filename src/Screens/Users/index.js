import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import DataGrid,{dgDataPrepare} from '../../Components/DataGrid';
import NotFound from '../../Components/NotFound';

// models
import {Users} from './../../Models';

// helpers
import {empty} from '../../Globals/Utils';

// globals
import {userStatus,userStatusName} from '../../Globals/Constants';

const UsersScreen = () => {
	const [users, setUsers] = useState(null);
	const [dataFull, setDataFull] = useState(null);
	const [status, setStatus] = useState(userStatus.IN_ACTIVE);
	useEffect(() => {
		const usersGet = async () => {
			const d = await Users.getAll();
			setUsers(dataSet(d.data));
			setDataFull(d.data);
		};
		usersGet();
	}, []);
	const dataSet = (data) => dgDataPrepare(data, 'users', ['id','name','username','status']);
	const dataStatus = (data, status) => data.filter(f => f.status === status);
	const handleStatus = (e) => {
		let status = e.target.value;
		let d = dataFull;
		if (empty(status)) status = null;
		if (status !== null) d = dataStatus(d, parseInt(status));
		setUsers(dataSet(d));
		setStatus(status);
	}
	return (
		<Template>
			{users === null ? <Loader /> :
				<DataGrid
					title={'Пользователи'} 
					keys={['ID','Имя','Имя пользователя','Статус']}
					link={'user'}
					data={users}
					dataFull={dataFull}
					controlPanel={<>
						<div></div>
						<div>
							<span>Статус</span>
							<select onChange={handleStatus}>
								<option value=" ">все</option>
								{userStatusName.map((v,i) => <option key={i} value={i}>{v}</option>)}
							</select>
						</div>
					</>}
					notFound={<NotFound />} />
			}
		</Template>
	);
};

export default UsersScreen;