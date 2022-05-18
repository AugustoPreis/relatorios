const express = require('express');
const painel = require('../controllers/painel/painel');

const router = new express.Router();

router.route('/painel/:id?')
	.get(painel.get)
	.post(painel.post);


module.exports = router;