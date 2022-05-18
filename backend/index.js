const http = require('http');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const routers = require('./server/utils/router');

const app = express();

const server = http.createServer(app);

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(compression());

app.use(routers);

server.listen(3000).on('listening', () => {
	console.log('Server iniciado na porta 3000!')
}).on('error', (err) => {
	console.log('Erro: ', err)
});