const PDFDocument = require('pdfkit');

function generate(data) {
	const doc = new PDFDocument({ margin: 0, size: 'a4' });

	return doc;
}

module.exports = { generate }