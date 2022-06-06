const relatorio = require('../relatorio/relatorio');
const fs = require('fs');
const path = require('path');

async function report(req, res) {
	try {
		const { body, files } = req;

		body.nome = body.nome.trim();
		const dir = path.join(__dirname, '../../../../atividades', body.nome);

		if (fs.existsSync(dir)) {
			throw JSON.stringify({
				message: 'ALREADY_EXISTS',
				path: path.join(dir, body.nome + '.pdf')
			});
		}

		const file = await relatorio.generate(body, files);

		fs.mkdirSync(dir);

		const writeStream = fs.createWriteStream(path.join(dir, `${body.nome}.pdf`));

		file.pipe(writeStream);

		writeStream.on('finish', () => {
			res.status(200).json({ nome: body.nome });
		});

		file.end();

		return body.nome;
	} catch (err) {
		throw err;
	}
}

async function getReport(name, res) {
	try {
		const dir = name.substring(0, name.lastIndexOf('.')) + '/' + name;
		const filePath = path.join(__dirname, `../../../../atividades/${dir}`);

		if (!fs.existsSync(filePath)) {
			res.status(404).json({ type: 404, message: 'Não foi possível encontrar a atividade.' });
			return;
		}

		const file = fs.createReadStream(filePath);

		file.on('open', () => {
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `inline; filename="${name}"`
			});

			file.pipe(res);
		});

		return { sucesso: true, relatorio: name };
	} catch (err) {
		throw err;
	}
}
module.exports = { report, getReport }