import Http from '../../Globals/Http';
import {requestOderType} from '../../Globals/Constants';

const get		= async (id)	=> await Http.get('transactions', {conditions:[{k:'id',v:id}]});
const getAll	= async ()		=> await Http.get('transactions', {orders:[{k:'id',isd:requestOderType.DESC}]});

export {
	get,
	getAll
}