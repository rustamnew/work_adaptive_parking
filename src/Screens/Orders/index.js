import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import DataGrid,{dgDataPrepare} from '../../Components/DataGrid';
import NotFound from '../../Components/NotFound';

// models
import {Clients,Parkings,Orders} from './../../Models';

const OrdersScreen = () => {
	const [orders, setOrders] = useState(null);
	useEffect(() => {
		const ordersGet = async () => {
			const clients = await Clients.getAll();
			const parkings = await Parkings.getAll();
			const d = await Orders.getAll();
			setOrders(dataSet(d.data, {parkings:parkings.data,clients:clients.data}));
		};
		ordersGet();
	}, []);
	const dataSet = (data, collection) => dgDataPrepare(data, 'orders', ['id','clientId','orderId','amount','amountFull','status','dateCreate'], collection);
	return (
		<Template>
			{orders === null ? <Loader /> :
				<DataGrid
					title={'Заказы'} 
					keys={['ID','Клиент','Парковка','Комиссия, ₽','Сумма, ₽','Статус','Дата']}
					link={'order'}
					data={orders}
					dataFull={orders}
					notFound={<NotFound />} />
			}
		</Template>
	);
};

export default OrdersScreen;