const relatorio = require('./relatorio');
const fs = require('fs');

async function report(query, res) {
	try {
		const params = [];

		const file = relatorio.generate(params);

		const codigo = Math.round(Math.random() * 100000000);

		const writeStream = fs.createWriteStream(`reports/${codigo}.pdf`)

		file.pipe(writeStream);

		writeStream.on('finish', function () {
			res.status(200).json({ codigo });
		});

		file.end();

		return codigo;
	} catch (err) {
		throw err;
	}
}

async function getReport(query) {
	try {
		return query;
	} catch (err) {
		throw err;
	}
}
module.exports = { report, getReport }