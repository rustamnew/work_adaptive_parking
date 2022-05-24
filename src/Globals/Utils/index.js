const phoneNormalize = (phone) => {
	if (!empty(phone)) {
		phone = phone.replace(/\s+/gi, '');
		phone = phone.replace(/-/gi, '');
		phone = phone.replace(/\(/gi, '');
		phone = phone.replace(/\)/gi, '');
		phone = phone.replace(/\+/gi, '');
		phone = phone.replace(/[^0-9]+/, '');
		if (!empty(phone)) phone = phone.length < 10 ? '' : phone;
		if (!empty(phone) && phone[0] === '8') phone = phone.substr(1);
		if (!empty(phone)) phone = phone[0] !== '7' ? '7' + phone : phone;
	}
	return phone && phone.length === 11 ? phone : null;
}

const phoneFormatter = (phone) => empty(phone) ? phone : phone.replace('+', '').replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
const empty = (text) => text == null || text === '' || text.toString().trim() === '';

const moneyFormat = (amount, nofraction) => amount ? amount.toFixed(nofraction === undefined || nofraction === true ? 2 : 0).replace(/(\d)(?=(\d{3})+(?!\d)\.?)/g, '$1 ') : 0;

const zeroPad = (num, places) => String(num).padStart(places, '0');

const rn2br = (text) => text.toString().replace(/\r\n/gi, '<br/>').replace(/\r/gi, '<br/>').replace(/\n/gi, '<br/>');

export {
	phoneNormalize,
	phoneFormatter,
	empty,
	moneyFormat,
	rn2br,
	zeroPad
}