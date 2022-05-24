import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import DataGrid,{dgDataPrepare} from '../../Components/DataGrid';
import NotFound from '../../Components/NotFound';

// models
import {Supports} from './../../Models';

const SupportsScreen = () => {
	const [supports, setSupports] = useState(null);
	useEffect(() => {
		const supportsGet = async () => {
			const d = await Supports.getAll();
			const data = [], fb = [];
			d.data.forEach((v) => data[v.clientId] = v);
			data.forEach((v) => fb.push(v));
			setSupports(dataSet(fb));
		};
		supportsGet();
	}, []);
	const dataSet = (data) => dgDataPrepare(data, 'supports', ['id','dateCreate','clientName']);
	return (
		<Template>
			{supports === null ? <Loader /> :
				<DataGrid
					title={'Поддержка'} 
					keys={['ID','Дата','Имя']}
					link={'support'}
					data={supports}
					dataFull={supports}
					notFound={<NotFound />} />
			}
		</Template>
	);
};

export default SupportsScreen;