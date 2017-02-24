'use strict';

const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database('./dindin.sqlite');
const server = new Hapi.Server();
server.connection({port: 4000});
server.bind({db: db});
const validateFunc = function (token, callback) {
	db.get('SELECT * FROM users WHERE token = ?', [token], (err, result) => {
		if (err) {
			return callback(err, false);
		}
		const user = result;
		if (typeof user === undefined) {
			return callback(null, false);
		}
		callback(null, true, {
			id: user.id,
			username: user.username
		})
	})
}

server.register(require('hapi-auth-bearer-token'), (error) => {
	if (error) {
		throw error;
	}
	server.auth.strategy('api', 'bearer-access-token', {
		validateFunc: validateFunc
	});

	const routes = require('./routes');
	server.route(routes);

	server.start((err) => {
		if (err) {
			throw err;
		}
		console.log('Sever start at port 4000');
	})
});