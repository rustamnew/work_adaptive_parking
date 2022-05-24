import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import DataGrid,{dgDataPrepare} from '../../Components/DataGrid';
import NotFound from '../../Components/NotFound';

// models
import {Settings} from './../../Models';

const SettingsScreen = () => {
	const [settings, setSettings] = useState(null);
	const [dataFull, setDataFull] = useState(null);
	useEffect(() => {
		const pagesGet = async () => {
			const d = await Settings.getAll();
			setSettings(dataSet(d.data));
			setDataFull(d.data);
		};
		pagesGet();
	}, []);
	const dataSet = (data) => dgDataPrepare(data, 'settings', ['id','name','code','value']);
	return (
		<Template>
			{settings === null ? <Loader /> :
				<DataGrid
					title={'Настройки'}
					keys={['ID','Название','Код','Значение']}
					link={'setting'}
					data={settings}
					dataFull={dataFull}
					controlAdd={<Link to={'/setting'}>Добавить</Link>}
					notFound={<NotFound />} />
			}
		</Template>
	);
};

export default SettingsScreen;