module.exports = {
	find: function (request, reply) {
		let query = 'SELECT * FROM recipes';
		let param = [];
		if (request.query.cuisine) {
			query = query + ' WHERE cuisine=?';
			param.push(request.query.cuisine);
		}
		this.db.all(query, param, (err, results) => {
			if (err) {
				throw err;
			}
			reply (results);
		});	
	},

	findOne: function (request, reply){
		let query = 'SELECT * FROM recipes WHERE id = ?';
		this.db.get(query, [request.params.id], (err, result) => {
			if (err) {
				throw err;
			}
			if(result){
				console.log(result);
			}
			if(result) {
				reply(result);
			} else {
				console.log('Not Found');
				reply('Not Found').code(404);
			}
		})
	},

	create: function (request, reply) {
		const sql = `INSERT INTO recipes (name, cooking_time, prep_time,
		 serves, cuisine, ingredients, directions, user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
		 this.db.run(sql, [
			 request.payload.name,
			 request.payload.cooking_time,
			 request.payload.prep_time,
			 request.payload.serves,
			 request.payload.cuisine,
			 request.payload.ingredients,
			 request.payload.directions,
			 request.auth.credentials.id
		 ], (err) => {
			 if (err) {
				 throw err;
			 }
			 reply({status: 'ok'});
		 })
	}
}