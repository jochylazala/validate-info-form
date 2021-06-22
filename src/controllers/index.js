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

	class User{
		constructor(emailTyped,date, milisecond, transcurrido, days, missingDay,hours,minutes,seconds,mili,second_date){
			this.emailTyped = emailTyped;
			this.date = date;
			this.milisecond = milisecond;
			this.transcurrido = transcurrido;
			this.days = days;
			this.missingDay = missingDay;
			this.hours = hours;
			this.minutes = minutes;
			this.seconds = seconds;
			this.mili = mili;
			this.second_date = second_date;
		}

		get miliDay(){
			return this.time();
		}

		time(){
			return this.milisecond = this.hours * this.minutes * this.seconds * this.mili;
		}
	}
	
	let data = new User(newuser.correo, new Date(),0,0,0,0,24,60,60,1000, new Date());
	newuser.firstDate = data.date; //that is for the date that will be sent to the database, the correct date
	
	function Check_Data(typeEmail){
		return typeEmail.correo === data.emailTyped;
	}
	let foundData = userData.find(Check_Data);

	let first_date;

	if(foundData === undefined){
		pool.query('INSERT INTO usuario set ?', [newuser]);
		res.sendFile(path.join(__dirname,'../public/second.html'))

	}else{
		update();
	}

	function update(){
		insertData();
		 if(foundData.correo == data.emailTyped && data.days > 60 ){	
			pool.query('INSERT INTO usuario set ?', [newuser]);
			res.sendFile(path.join(__dirname,'../public/second.html'))
		
		}else{
			res.send("Debes de esperar para volverlo a intentar" + " " + data.missingDay + " " + "dias");

		}

	}

	function insertData(){
		first_date =   new Date(foundData.firstDate);
		data.transcurrido = Math.abs(first_date.getTime() - data.second_date.getTime());
		data.days = Math.round(data.transcurrido / data.miliDay);
		data.missingDay  = Math.abs(data.days - 60);
	};

	});
	
};

controller.second = (req, res) => {
	res.sendFile(path.join(__dirname,'../public/second.html'));
}

module.exports = controller;