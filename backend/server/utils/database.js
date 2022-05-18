const fs = require('fs');
const pg = require('pg');
const Pool = pg.Pool;

pg.types.setTypeParser(1700, (value) => {
	return parseFloat(value);
});

const execute = async (query, params = []) => {
	const pool = new Pool(configDB());

	try {
		return new Promise((resolve, reject) => {
			pool.query(query, params, (err, res) => {
				if (err) {
					pool.end();
					reject(err);
				} else {
					pool.end();
					resolve(res);
				}
			});
		})
	} catch (error) {
		pool.end();
		throw error;
	}
}

const multiExecute = async (pool, query, params = [], finish = false) => {
	try {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await pool.query(query, params)

				if (finish) {
					await pool.query('COMMIT');
					pool.end();
				}
				resolve({ data: res, pool });
			} catch (error) {
				reject(error);
			}
		})
	} catch (error) {
		await pool.query('ROLLBACK');
		await pool.end();
		throw error;
	}
}

const open = async () => {
	const pool = new Pool(configDB());

	try {
		return new Promise(async (resolve, reject) => {
			try {
				await pool.query('BEGIN');

				resolve(pool);
			} catch (error) {
				reject(error);
				throw error;
			}
		})
	} catch (error) {
		await pool.query('ROLLBACK');
		await pool.end();
		throw error;
	}
}

const commit = async (pool) => {
	try {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await pool.query('COMMIT');

				await pool.end();

				resolve(data);
			} catch (error) {
				reject(error);
				throw error;
			}
		})
	} catch (error) {
		await pool.query('ROLLBACK');
		await pool.end();
		throw error;
	}
}

const rollback = async (pool) => {
	return new Promise(async (resolve, reject) => {
		try {
			const data = await pool.query('ROLLBACK');

			await pool.end();

			resolve(data);
		} catch (error) {
			reject(error);
		}
	})
}

const clear = async (pool) => {
	try {
		if (pool) {
			try {
				await pool.end();
			} catch (err) {
				console.log(err);
			}
		}
	} catch (error) {
		throw error;
	}
}

const createConnection = async () => {
	try {
		await execute(`SELECT 1`);

		return 'Banco conectado com sucesso';
	} catch (error) {
		throw 'Ocorreu um erro ao conectar com o banco';
	}
}

const configDB = () => {
	return {
		user: 'postgres',
		host: 'localhost',
		database: '',
		password: '',
		port: 5432
	}
}

module.exports = { execute, multiExecute, open, clear, commit, rollback, createConnection };