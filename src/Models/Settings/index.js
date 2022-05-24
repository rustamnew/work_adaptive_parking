import Http from '../../Globals/Http';
import {requestOderType} from '../../Globals/Constants';

const get		= async (id)		=> await Http.get('settings', {conditions:[{k:'id',v:id}]});
const getAll	= async ()			=> await Http.get('settings', {orders:[{k:'id',isd:requestOderType.DESC}]});

const getByKey	= (code, settings)	=> settings.find(f => f.code === code);


const update	= (id, data, callback, error) => Http.put('settings', {data,conditions:[{k:'id',v:id}]})
					.then((res) => callback(res))
					.catch((err) => error ? error(err) : {});

const add		= (data, callback, error) => Http.post('settings', {data})
					.then((res) => callback(res))
					.catch((err) => error ? error(err) : {});

export {
	get,
	getAll,
	getByKey,
	update,
	add
}