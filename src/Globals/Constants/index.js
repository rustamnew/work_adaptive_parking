const isDeveloperMode = process.env.NODE_ENV !== 'production';
const url = isDeveloperMode ? '//localhost' : '//in-parking.ru';

const API = {
	url			: `${url}/api`,
	assets		: `${url}/assets`,
	key			: '516a640f-2853-4824-bf42-c85786d938ee',
	version		: '1.0.2'
};

const MAP = {
	keyYandex			: 'e51fae54-9337-47b7-b280-b5605048a3f4',
	geoUrlAddress		: (address) => `https://geocode-maps.yandex.ru/1.x/?apikey=${MAP.keyYandex}&format=json&lang=ru_RU&geocode=${encodeURIComponent(address)}`,
	defaultCoordinates	: [55.799858, 49.105206],
};

const requestConditionType = {
	EQUAL		: 0,
	NOT_EQUAL	: 1,
	LESS		: 2,
	MORE		: 3,
	IS_NULL		: 4,
	NOT_NULL	: 5,
	LIKE		: 6
};

const requestConcatinationType = {
	AND			: 0,
	OR			: 1
};

const requestOderType = {
	ASC			: 0,
	DESC		: 1
};

const userStatus = {
	ACTIVE		: 0,
	BAN			: 1,
	DELETE		: 2
};
const userStatusName = ['активен','забанен','удален'];

const clientStatus = {
	IN_ACTIVE	: 0,
	ACTIVE		: 1,
	BAN			: 2,
	DELETE		: 3
};
const clientStatusName = ['не активен','активен','забанен','удален'];

const commonStatus = {
	IN_ACTIVE	: 0,
	ACTIVE		: 1
};
const commonStatusName = ['не активен','активен'];

const orderStatus = {
	ADDED		: 0,
	PAID		: 1
}
const orderStatusName = ['создан','опалчен']

const transactionStatus = {
	ADDED		: 0,
	PAID		: 1
}
const transactionStatusName = ['создан','опалчен']

const mediaType = {
	EMPTY		: 0,
	TEXT		: 1,
	IMAGE		: 2
}

const messageStatus = {
	UNKNOWN		: 0,
	READED		: 1
}

const parkingStatus = {
	IN_ACTIVE	: 0,
	ACTIVE		: 1,
	HOLD		: 2,
	DONE		: 3
};
const parkingStatusName = ['не активена','активена','забронирована','завершена'];

export {
	API,
	MAP,
	url,
	requestConditionType,
	requestConcatinationType,
	requestOderType,
	userStatus,
	userStatusName,
	clientStatus,
	clientStatusName,
	commonStatus,
	commonStatusName,
	mediaType,
	messageStatus,
	orderStatus,
	orderStatusName,
	transactionStatus,
	transactionStatusName,
	parkingStatus,
	parkingStatusName
};