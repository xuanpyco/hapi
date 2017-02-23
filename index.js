'use strict';

const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database('./dindin.sqlite');
const server = new Hapi.Server();
server.connection({port: 4000});
server.bind({db: db});

const routes = require('./routes');
server.route(routes);

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Sever start at port 4000');
})