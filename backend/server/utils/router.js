const express = require('express');
const gerador = require('../controllers/gerador/gerador');

const router = new express.Router();

router.route('/gerador/:id?')
	.get(gerador.get)
	.post(gerador.post);


module.exports = router;