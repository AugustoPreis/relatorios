const express = require('express');
const painel = require('../controllers/painel/painel');

const router = new express.Router();

router.route('/painel/:id?')
	.get(painel.get)
	.post(painel.post)
	.post(painel.put)
	.post(painel.deletar);

router.route('/visualizar/:id?')
	.get(painel.get)
	.post(painel.post)
	.post(painel.put)
	.post(painel.deletar);


module.exports = router;