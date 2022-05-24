import Http from '../../Globals/Http';
import {requestOderType} from '../../Globals/Constants';

const get		= async (id)	=> await Http.get('feedbacks', {conditions:[{k:'id',v:id}]});
const getAll	= async ()		=> await Http.get('feedbacks', {orders:[{k:'id',isd:requestOderType.DESC}]});

export {
	get,
	getAll
}