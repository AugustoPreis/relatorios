function isDate(date) {
	return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date)) && date.getTime && typeof date.getTime === 'function';
}

function isFile(value) {
	return value && value.toString().toLowerCase().indexOf('file') > -1;
}

function formDataAppend(form, data, lastChild) {
	for (var name in data) {
		let value = data[name];

		if (typeof value === 'undefined' || value == null) {
			continue;
		}

		if (typeof value === 'function') {
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

export { formData, formDataAppend, isDate, isFile }