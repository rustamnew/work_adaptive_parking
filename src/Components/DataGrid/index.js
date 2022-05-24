import {Link} from 'react-router-dom';

// plug-ins
import Moment from 'moment';

// helpers
import {phoneFormatter,moneyFormat} from '../../Globals/Utils';

// globals
import {clientStatusName,commonStatusName,orderStatusName,parkingStatusName,transactionStatusName} from '../../Globals/Constants';

// styles
import './styles.css';

const DataGrid = ({title,keys,data,dataFull,link,notFound,controlPanel,controlAdd}) => {
	const linkShow = (link, item, parent) => {
		if (item.key === 'id') return <Link to={`${link}/${idGet(parent)}`}>{item.show}</Link>;
		return item.show;
	}
	const idGet = (parent) => {
		for (const item of parent) {
			if (item.key === 'id') return item.value;
		}
		return 0;
	}
	return (
		<div className="dg-container">
			<h4>
				{title}
				{controlAdd || null}
			</h4>
			{dataFull === null || dataFull.length === 0 ? notFound
				:
					<div className="list">
						<div className="controls">
							{controlPanel || null}
						</div>
						{data === null || data.length === 0 ? notFound
						:
							<table>
								<thead>
									<tr>
										<th>№</th>
										{keys.map((v,i) => <th key={i}>{v}</th>)}
									</tr>
								</thead>
								<tbody>
									{data.map((v,i) => <tr key={i}>
										<td>{i+1}</td>
										{v.map((r,j) => <td key={j}>{linkShow(link,r,v)}</td>)}
									</tr>)}
								</tbody>
							</table>
						}
				</div>
			}
		</div>
	);
};
export default DataGrid;

export const dgDataPrepare = (data, tableName, keys = [], collection = {}) => {
	const out = [];
	data.forEach((v) => {
		const inner = [];
		if (keys.length === 0) {
			for (const k in v) inner.push(valueGet(k, v[k], tableName, collection));
		} else keys.forEach((k) => inner.push(valueGet(k, v[k], tableName, collection)));
		out.push(inner);
	});
	return out;
}
const valueGet = (key, value, tableName, collection) => {
	let show = value;
	switch(key) {
		case 'phone':
			show = phoneFormatter(value);
			break;
		case 'dateCreate':
			show = Moment(value*1000).format('DD.MM.y, H:mm');
			break;
		case 'dateExpire':
			show = value ? Moment(value*1000).format('DD.MM.y, H:mm') : '—';
			break;
		case 'status':
			show = statusGet(tableName, value);
			break;
		case 'clientId':
			if (collection && collection['clients']) {
				const client = collection['clients'].find(f => f.id === value);
				show = client ? <Link to={`/client/${client.id}`}>{client.name}</Link> : '—';
			} else show = null;
			break;
		case 'orderId':
			if (collection && collection['orders']) {
				const order = collection['orders'].find(f => f.id === value);
				show = order ? <Link to={`/order/${order.id}`}>{order.id}</Link> : '—';
			} else show = null;
			break;
		case 'amount':
		case 'amountFull':
			show = moneyFormat(value, false);
			break;
		default: break;
	}
	return {key,value,show};
}
const statusGet = (tableName, value) => {
	switch(tableName) {
		case 'clients':
			return clientStatusName[value];
		case 'orders':
			return orderStatusName[value];
		case 'transactions':
			return transactionStatusName[value];
		case 'parkings':
			return parkingStatusName[value];
		default: return commonStatusName[value];
	}
}