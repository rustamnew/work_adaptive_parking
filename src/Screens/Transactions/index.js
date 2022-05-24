import React, {useEffect,useState} from 'react';

// components
import Template from '../../Components/Template';
import Loader from '../../Components/Loader';
import DataGrid,{dgDataPrepare} from '../../Components/DataGrid';
import NotFound from '../../Components/NotFound';

// models
import {Clients,Orders,Transactions} from './../../Models';

const TransactionsScreen = () => {
	const [transactions, setTransactions] = useState(null);
	useEffect(() => {
		const transactionsGet = async () => {
			const clients = await Clients.getAll();
			const orders = await Orders.getAll();
			const d = await Transactions.getAll();
			setTransactions(dataSet(d.data, {orders:orders.data,clients:clients.data}));
		};
		transactionsGet();
	}, []);
	const dataSet = (data, collection) => dgDataPrepare(data, 'transactions', ['clientId','orderId','amount','externalId','status','dateCreate'], collection);
	return (
		<Template>
			{transactions === null ? <Loader /> :
				<DataGrid
					title={'Транзакции'} 
					keys={['Клиент','Заказ','Сумма, ₽','Внешний ID','Статус','Дата']}
					link={'transaction'}
					data={transactions}
					dataFull={transactions}
					notFound={<NotFound />} />
			}
		</Template>
	);
};

export default TransactionsScreen;