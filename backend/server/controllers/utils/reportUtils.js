const path = require('path');

function border(doc, size = 30) {
	const { height, width } = doc.page;

	doc
		.rect(15, 15, width - size, height - 30)
		.stroke();

	return doc;
}

function header(doc, data) {
	let y = 25;
	doc = changeFont(doc, 12, 'times-new-roman');

	doc
		.image(path.join(__dirname, '../../../img/logo.jpg'), 25, y, {
			width: 95,
			align: 'center'
		});

	doc
		.fontSize(14)
		.text('ESTADO DE SANTA CATARINA', 125, y + 15);

	doc
		.fontSize(14)
		.text('MUNICÍPIO DE NOVA VENEZA', 125, y + 40);

	doc
		.fontSize(14)
		.text('CENTRO EDUCACIONAL NONNA ANGELINA NAZARI', 125, y + 65);

	if (data.projeto) {
		doc.text(`PROJETO: ${data.projeto.toUpperCase()}`, 30, y + 125);

		y += 17;
	}

	if (data.atividade) {
		doc.text(`ATIVIDADE: ${data.atividade.toUpperCase()}`, 30, y + 125);

		y += 17;
	}

	doc.text('TURMA: BERÇÁRIO IIA', 30, y + 125);

	doc = changeFont(doc, 14, 'arial-bold');

	doc.text(data.titulo, 0, y + 150, {
		width: doc.page.width,
		align: 'center'
	})

	return doc;
}

function changeFont(doc, size = 9, font) {
	doc
		.font(`reports/fonts/${font}.ttf`)
		.fontSize(size);

	return doc;
}

function addPage(doc, page, add) {
	page++;
	doc.addPage({ margin: 0, size: 'A4' });
	doc.switchToPage(page);
	border(doc);
	header(doc);

	add && add(page);

	return doc;
}

module.exports = { border, changeFont, header, addPage }