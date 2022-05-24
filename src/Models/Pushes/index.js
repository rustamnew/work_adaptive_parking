import Http from '../../Globals/Http';

const add = (title, subtitle, text, userid, data) => {
	const d = {
		title,
		subtitle,
		text,
		tag:'client_id',
		value:userid,
		data
	};
	Http.post('pushes', d);
}

const addAll = (title, subtitle, text) => {
	const data = {
		title,
		subtitle,
		text,
		tag:'Active Users',
		data:{type:'MESSAGE'}
	};
	Http.post('pushes', data);
}

export {
	add,
	addAll
}