import Http from '../../Globals/Http';
import {requestOderType} from '../../Globals/Constants';

const login		= async (username, password)	=> await Http.request('users', 'login', {conditions:[{k:'username',v:username},{k:'password',v:password}]});

const get		= async (id)					=> await Http.get('users', {conditions:[{k:'id',v:id}]});
const getAll	= async ()						=> await Http.get('users', {orders:[{k:'id',isd:requestOderType.DESC}]});

const add		= (data, callback, error)		=> Http.post('users', {data:data}).then((res) => callback(res)).catch((err) => error ? error(err) : {});
const update	= (id, data, callback, error)	=> Http.put('users', {data:data,conditions:[{k:'id',v:id}]}).then((res) => callback(res)).catch((err) => error ? error(err) : {});

export {
	login,
	getAll,
	get,
	add,
	update
}