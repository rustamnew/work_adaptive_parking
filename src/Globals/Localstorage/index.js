/**
 * Create a localStorage with the given name and value.
 *
 * @example ls('the_ls', 'the_value');
 * @desc Set the value of a localStorage.
 * @example ls('the_ls', null);
 * @desc Delete a localStorage by passing null as value.
 * @example ls();
 * @desc Clear a localStorage.
 *
 * @param String name The name of the localStorage.
 * @param String value The value of the localStorage.
 *
 *
 * Get the value of a localStorage with the given name.
 *
 * @example ls('the_ls');
 * @desc Get the value of a localStorage.
 *
 * @param String name The name of the localStorage.
 * @return The value of the localStorage.
 * @type String
 *
 */

const ls = (name, value) => {
	if (typeof value != 'undefined') {
		if (value === null) window.localStorage.removeItem(name);
		else window.localStorage.setItem(name, JSON.stringify(value));
	} else {
		if (typeof name == 'undefined') window.localStorage.clear();
		else return JSON.parse(window.localStorage.getItem(name) || null);
	}
};

export {
	ls
}