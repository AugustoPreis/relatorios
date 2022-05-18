const relatorio = require('./relatorio');
const fs = require('fs');

async function report(query, res) {
	try {
		query.anexos = JSON.parse(query.anexos)

		const file = relatorio.generate(query, query.logo);

		const codigo = 'atividade_' + Math.round(Math.random() * 100000000);

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

async function getReport(name, res) {
	try {
		const filePath = `reports/${name}`;

		if (!fs.existsSync(filePath)) {
			res.status(404).json({ type: 404, message: 'Não foi possível encontrar o relatório solicitado.' });
			return;
		}

		const file = fs.createReadStream(filePath);

		file.on('open', () => {
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `inline; filename="arquivo_${name}"`
			});

			file.pipe(res);
		});

		return { sucesso: true, relatorio: name };
	} catch (err) {
		throw err;
	}
}
module.exports = { report, getReport }