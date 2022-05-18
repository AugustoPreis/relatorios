const painelController = require('./painelController');

async function get(req, res) {
	try {
		const rows = await painelController.getReport(req.params.id, res);

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
		const rows = await painelController.report(req.body, res);

		res.status(201).json(rows);
	} catch (err) {
		if (typeof err === 'object')
			res.status(404).json({ message: err.message });
		else
			res.status(404).json({ message: err });
	}
}

module.exports = { get, post, }