import Http from '../../Globals/Http';
import {requestOderType} from '../../Globals/Constants';

const get		= async (id)	=> await Http.get('clients', {conditions:[{k:'id',v:id}]});
const getAll	= async ()		=> await Http.get('clients', {orders:[{k:'id',isd:requestOderType.DESC}]});

const update	= (id, data, callback, error) => Http.put('clients', {data,conditions:[{k:'id',v:id}]})
					.then((res) => callback(res))
					.catch((err) => error ? error(err) : {});

export {
	get,
	getAll,
	update
}