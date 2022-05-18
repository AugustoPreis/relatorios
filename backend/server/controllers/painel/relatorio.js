const PDFDocument = require('pdfkit');
const { header, addPage, border } = require('../utils/reportUtils');

function generate(data) {
	let doc = new PDFDocument({ margin: 0, size: 'a4' });

	doc = border(doc);

	doc = header(doc, data);

	doc = putFiles(doc, data.anexos || []);

	return doc;
}

function putFiles(doc, files) {
	let page = 0;

	for (let i = 0; i < files.length; i++) {
		const file = files[i];

		if (i != (file.length - 1)) {
			addPage(doc, page, (newPage) => { page = newPage })
		}
	}

	return doc;
}

module.exports = { generate }