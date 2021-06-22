const pool = require('../database');
const check = {}

check.Data = (req, res) =>{
	const data =  pool.query('select * from usuario');
	return new Promise((res, rej) => {
		setTimeout(() =>{
			res(data)
		}, 500);
	});

}

module.exports = check;