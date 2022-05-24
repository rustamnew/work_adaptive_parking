import Http from '../../Globals/Http';
import {requestOderType} from '../../Globals/Constants';

const get			= async (id)		=> await Http.get('supports', {conditions:[{k:'id',v:id}]});
const getAll		= async ()			=> await Http.get('supports', {orders:[{k:'id',isd:requestOderType.DESC}]});

const getByClient	= async (clientId)	=> await Http.get('supports', {conditions:[{k:'clientId',v:clientId}],orders:[{k:'id',isd:requestOderType.DESC}]});

const add			= async (data)		=> await Http.post('supports', {data});

export {
	get,
	getAll,
	getByClient,
	add
}