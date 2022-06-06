const PDFDocument = require('pdfkit');
const { header, addPage, border } = require('../utils/reportUtils');

async function generate(data, files) {
	let doc = new PDFDocument({ margin: 0, size: 'A4' });

	doc = border(doc);

	doc = header(doc, data);

	doc = await putFiles(doc, data, files || []);

	return doc;
}

async function putFiles(doc, data, files) {
	let page = 0;

	for (let i = 0; i < files.length; i++) {
		const { buffer } = files[i];

		doc
			.image(buffer, 35, 250, { fit: [520, 520] });

		if (i != (files.length - 1)) {
			addPage(doc, page, data, (newPage) => { page = newPage })
		}
	}

	return doc;
}

module.exports = { generate }