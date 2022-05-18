const painelController = require('./painelController');

async function get(req, res) {
	let rows;
	const type = req.params.id;
	try {
		switch (type) {
			case 'relatorio':
				rows = await painelController.report(req.query, res);

				return;
			case 'visualizar':
				rows = await painelController.getReport(req.query);

				break;
			default:
				break;
		}

		res.status(201).json(rows);
	} catch (err) {
		if (typeof err === 'object')
			res.status(404).json({ message: err.message });
		else
			res.status(404).json({ message: err });
	}
}

async function post(req, res) {
	try {
		rows = await painelController.save(req.body, req.user);

		res.status(201).json(rows);
	} catch (err) {
		if (typeof err === 'object')
			res.status(404).json({ message: err.message });
		else
			res.status(404).json({ message: err });
	}
}

async function put(req, res) {
	try {
		rows = await painelController.update(req.body, req.user);

		res.status(201).json(rows);
	} catch (err) {
		if (typeof err === 'object')
			res.status(404).json({ message: err.message });
		else
			res.status(404).json({ message: err });
	}
}

async function deletar(req, res) {
	try {
		rows = await painelController.deleteOne(req.query, req.user);

		res.status(201).json(rows);
	} catch (err) {
		if (typeof err === 'object')
			res.status(404).json({ message: err.message });
		else
			res.status(404).json({ message: err });
	}
}

module.exports = { get, post, put, deletar }