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
	}
}