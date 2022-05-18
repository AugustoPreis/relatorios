const relatorio = require('../relatorio/relatorio');
const fs = require('fs');
const path = require('path');

async function report(query, res) {
	try {
		const nome = query.nome.trim();
		const dir = path.join(__dirname, '../../../../atividades/' + nome);

		if (fs.existsSync(path.join(dir, nome + '.pdf'))) {
			throw JSON.stringify({
				message: 'ALREADY_EXISTS',
				path: path.join(dir, nome + '.pdf')
			});
		}

		const file = relatorio.generate(query);

		fs.mkdirSync(dir);

		const writeStream = fs.createWriteStream(path.join(dir, `${nome}.pdf`));

		file.pipe(writeStream);

		writeStream.on('finish', () => {
			res.status(200).json({ nome: query.nome });
		});

		file.end();

		return query.nome;
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