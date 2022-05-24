import Http from '../../Globals/Http';
import {requestOderType} from '../../Globals/Constants';

const get		= async (id)	=> await Http.get('orders', {conditions:[{k:'id',v:id}]});
const getAll	= async ()		=> await Http.get('orders', {orders:[{k:'id',isd:requestOderType.DESC}]});

export {
	get,
	getAll
}