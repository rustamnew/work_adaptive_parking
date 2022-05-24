import Http from '../../Globals/Http';
import {parkingStatus,requestOderType} from '../../Globals/Constants';

const get		= async (id)	=> await Http.get('parkings', {conditions:[{k:'id',v:id}]});
const getAll	= async ()		=> await Http.get('parkings', {orders:[{k:'id',isd:requestOderType.DESC}]});
const getActive	= async ()		=> await Http.get('parkings', {conditions:[{k:'status',v:parkingStatus.ACTIVE}]});

export {
	get,
	getAll,
	getActive
}