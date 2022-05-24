import {API} from '../Constants';

const isDevelopmentMode = process.env.NODE_ENV !== 'production';

const request = async (controller, method, data) => {
	const url = `${API.url}/${controller}/${method}`;
	const options = {
		method:'POST',
		mode:'cors',
		headers:{
			'Authentication':API.key,
			'Content-Type':'application/json'
		},
		body: data == null ? null : JSON.stringify(data)
	};
	const response = await fetch(url, options);
	if (response.status === 200) {
		if (isDevelopmentMode) console.log(response);
		const json = await response.json();
		if (isDevelopmentMode) console.log(json);
		return json;
	}
	console.log('error:', response);
	throw await response.json();
};

const get		= async (controller, data) => await request(controller, 'get', data);
const post		= async (controller, data) => await request(controller, 'add', data);
const put		= async (controller, data) => await request(controller, 'update', data);
const remove	= async (controller, data) => await request(controller, 'delete', data);

const Http = {
	get,
	post,
	put,
	remove,
	request
};

export default Http;