import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import DataGrid,{dgDataPrepare} from '../../Components/DataGrid';
import NotFound from '../../Components/NotFound';

// models
import {Feedbacks} from './../../Models';

const FeedbacksScreen = () => {
	const [feedbacks, setFeedbacks] = useState(null);
	useEffect(() => {
		const feedbacksGet = async () => {
			const d = await Feedbacks.getAll();
			setFeedbacks(dataSet(d.data));
		};
		feedbacksGet();
	}, []);
	const dataSet = (data) => dgDataPrepare(data, 'feedbacks', ['id','clientName','phone','dateCreate']);
	return (
		<Template>
			{feedbacks === null ? <Loader /> :
				<DataGrid
					title={'Обратная связь'} 
					keys={['ID','Имя','Телефон','Дата']}
					link={'feedback'}
					data={feedbacks}
					dataFull={feedbacks}
					notFound={<NotFound />} />
			}
		</Template>
	);
};

export default FeedbacksScreen;