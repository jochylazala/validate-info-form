const path = require('path');
const pool = require('../database');
const check = require('./check.js');
const controller = {};
//routes
controller.index = (req, res) => {
	res.sendFile(path.join(__dirname,'../public/index.html'))
} 

controller.in =  (req, res) => {
	check.Data().then((result) =>{
		var userData = Object.values(JSON.parse(JSON.stringify(result)))
		const { nombre, correo, firstDate } = req.body;
		const newuser = {
			nombre,
			correo,
			firstDate
	};
	let verify_email = newuser.correo;
	newuser.firstDate = new Date();
			
	function Check_Data(typeEmail){
		return typeEmail.correo === verify_email;
	}
	let finalCheck = userData.find(Check_Data)
	
	let first_date, second_date, milisecond,transcurrido, id;
	let days = 0, missingDay = 0;

	if(finalCheck === undefined){
		pool.query('INSERT INTO usuario set ?', [newuser]);
		res.sendFile(path.join(__dirname,'../public/second.html'))

	}else{
		update();
	}

	function update(){
		insertData();
		 if(finalCheck.correo == verify_email && days > 60 ){	
			pool.query('INSERT INTO usuario set ?', [newuser]);
			res.sendFile(path.join(__dirname,'../public/second.html'))
		
		}else{
			res.send("Debes de esperar para volverlo a intentar" + " " + missingDay + " " + "dias");

		}

	}

	function insertData(){
		first_date =   new Date(finalCheck.firstDate);
		second_date = new Date()
		milisecond = 24 * 60 * 60 * 1000;
		transcurrido = Math.abs(first_date.getTime() - second_date.getTime());
		days = Math.round(transcurrido / milisecond);
		missingDay  = Math.abs(days - 60);
	};

	});
	
};

controller.second = (req, res) => {
	res.sendFile(path.join(__dirname,'../public/second.html'));
}

module.exports = controller;