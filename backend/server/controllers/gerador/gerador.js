const geradorController = require('./geradorController');

async function get(req, res) {
	try {
		return await geradorController.getReport(req.params.id, res);
	} catch (err) {
		if (typeof err === 'object')
			res.status(404).json({ message: err.message });
		else
			res.status(404).json({ message: err });
	}
}

async function post(req, res) {
	try {
		return await geradorController.report(req.body, res);
	} catch (err) {
		if (typeof err === 'object')
			res.status(404).json({ message: err.message });
		else
			res.status(404).json({ message: err });
	}
}

module.exports = { get, post }