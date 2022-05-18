const { notification } = require("antd");
const { default: axios } = require("axios");

function isDate(date) {
	return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date)) && date.getTime && typeof date.getTime === 'function';
}

function isFile(value) {
	return value && value.toString().toLowerCase().indexOf('file') > -1;
}

function formDataAppend(form, data, lastChild) {
	for (let name in data) {
		let value = data[name];

		if (!value || typeof value === 'function' || typeof value === 'undefined') {
			continue;
		}

		let newName = name;

		if (Array.isArray(data)) {
			newName = lastChild;

			if (!isFile(value)) {
				newName += '[' + name + ']';
			}
		} else if (lastChild) {
			newName = lastChild + '.' + newName;
		}

		if (typeof value === 'object') {
			if (Array.isArray(value) || (value && !isFile(value) && !isDate(value))) {
				formDataAppend(form, value, newName);
				continue;
			}
		}

		if (isDate(value)) {
			value = value.toISOString();
		}

		form.append(newName, value);
	}

	return form;
}

function formData(data) {
	var form = new FormData();

	formDataAppend(form, data);

	return form;
}

const request = (url, options) => {
	if (options.files) {
		options.method = 'post'
		options.body = formData(options.body)
	}

	return axios[options.method](url, options);
}

export default request;